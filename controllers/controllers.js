const express = require('express')
const mongoose = require('mongoose')
//const movies = require('../config/movies.json')
const Movie = require('../models/Movies')
const controller = async (req,res)=>{
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 5
        const search = req.query.search || ""
        let genre = req.query.genre || "All"
        let sort = req.query.sort || 'rating'
        const genreOptions = [
            "Action",
			"Romance",
			"Fantasy",
			"Drama",
			"Crime",
			"Adventure",
			"Thriller",
			"Sci-fi",
			"Music",
			"Family",
        ]
        //or
        genre === "All"
        ? (genre = [...genreOptions])
        : (genre = req.query.genre.split(' , '))

        req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [ sort ])

        let sortBy = {}
        if (sort[1]) {
            sortBy[sort[0]] = sort[1]
        } else {
            sortBy[sort[0]] = "asc"
        }
        const movies = await Movie.find({name :{$regex :search, $options : 'i'}})
                       .where('genre')
                       .in([...genre])
                       .sort(sortBy)
                       .skip(page * limit)
                       .limit(limit)
        
        const total = await Movie.countDocuments({
            genre:{$in:[...genre]},
            name:{$regex:search,$options:'i'}
        })
        const response = {
            error:false,
            total,
            page:page + 1,
            limit,
            genres:genreOptions,
            movies
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:true,message:'Internal Server Error'})
    }
}
const findById = async (req,res)=>{
    try {
        
        const movies = await Movie.find({_id:req.params.id})
                     
      
        res.status(200).json(movies)
    } catch (error) {
        console.log(error)
    }
}
const postMovie = async (req,res)=>{
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 5
       
        let genre = req.query.genre || "All"
        let sort = req.query.sort || 'rating'
        const movie = await Movie.create(req.body)
        const genreOptions = [
            "Action",
			"Romance",
			"Fantasy",
			"Drama",
			"Crime",
			"Adventure",
			"Thriller",
			"Sci-fi",
			"Music",
			"Family",
        ]
        //or
        genre === "All"
        ? (genre = [...genreOptions])
        : (genre = req.query.genre.split(' , '))

        req.query.sort 
        ? (sort = req.query.sort.split(',')) 
        : (sort = [ sort ])

        let sortBy = {}
        if (sort[1]) {
            sortBy[sort[0]] = sort[1]
        } else {
            sortBy[sort[0]] = "asc"
        }
        const response = {
            error:false,
            movie,
            page:page + 1,
            limit,
            genres:genreOptions,
            movies
        }
        res
        .status(201)
        .json({response})  
        
    } catch (error) {
        console.log(error)
    }
}
/*
const populateMovies = async ()=>{
    try {
        const docs = await Movie.insertMany(movies)
        return Promise.resolve(docs)
    } catch (error) {
        return Promise.reject(error)
    }
}
populateMovies()
.then(docs => console.log(docs))
.catch(err => console.log(err))
*/
module.exports = {controller,findById,postMovie}