import { CommentService } from './services/comment.service';
import { CommentMssqlRepository } from './services/repositories/impl/mssql/comment.repository';
import { MovieService } from './services/movie.service';
import { MovieMssqlRepository } from './services/repositories/impl/mssql/movie.repository';
import { TestService } from './services/test.service';
import express = require('express');
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";

export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        // repositories
        movieRepository: asClass(MovieMssqlRepository).scoped(),
        commentRepository: asClass(CommentMssqlRepository).scoped(),

        // services
        movieService: asClass(MovieService).scoped(),
        commentService: asClass(CommentService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
};

