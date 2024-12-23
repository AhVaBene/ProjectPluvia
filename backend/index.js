const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/userRoutes');
const reportRouter = require('./src/routes/reportRoutes');
const cors = require('cors');