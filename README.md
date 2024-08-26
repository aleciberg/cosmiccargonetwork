# ![Cosmic Cargo Network](./assets/image_fx_.png)

## Cosmic Cargo Network

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://travis-ci.org/yourusername/cosmiccargonetwork.svg?branch=master)](https://travis-ci.org/yourusername/cosmiccargonetwork)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/cosmiccargonetwork.svg)](https://github.com/yourusername/cosmiccargonetwork/issues)

### Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Examples](#examples)
6. [Roadmap](#roadmap)
7. [Contributing](#contributing)
8. [License](#license)
9. [Acknowledgements](#acknowledgements)

## Introduction

Welcome to **Cosmic Cargo Network**! This project aims to create an efficient and scalable network for interstellar cargo transport.

Database Layout
![Database Layout](./assets/db.png)

## Features

- APIs to print all planets, galaxies, superclusters, cargo categories, and cargo classes.
- Distance calculator (coming soon...)
- Shipping quote (coming soon....)

## Installation

Coming Soon

### Prerequisites

- Go
- PostgreSQL

### Installation Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/aleciberg/cosmiccargonetwork.git
   ```

## Usage

To start the project, run:

```sh
go run server.go
```

The server is now running at http://localhost:1323

GET /planets
GET /planets/:name
GET /galaxies
GET /galaxies/:name
GET /superclusters
GET /superclusters/:name

POST /shipping
