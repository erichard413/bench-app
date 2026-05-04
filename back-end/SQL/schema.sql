CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    username VARCHAR(20) NOT NULL,
    display_name VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(30) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE rosters (
    user_id INTEGER REFERENCES users ON DELETE SET NULL,
    team_id INTEGER REFERENCES teams ON DELETE SET NULL,
    season_id INTEGER REFERENCES seasons ON DELETE SET NULL,
    jersey_number INTEGER NOT NULL,
    role TEXT
);

CREATE TABLE seasons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP
);

CREATE TABLE team_seasons (
    team_id INTEGER REFERENCES teams,
    season_id INTEGER REFERENCES seasons
);

CREATE TYPE position_type AS ENUM ('RW', 'LW', 'C', 'D', 'G');

CREATE TABLE positions (
    pos_abbr position_type PRIMARY KEY
);

CREATE TABLE roster_positions (
    user_id INTEGER references users,
    team_id INTEGER references teams,
    season_id INTEGER references seasons,
    position_id position_type references positions
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    season_id INTEGER REFERENCES seasons,
    date_time TIMESTAMP,
    place VARCHAR(30) NOT NULL,
    home_team_id INTEGER REFERENCES teams,
    away_team_id INTEGER REFERENCES teams,
    is_played BOOLEAN DEFAULT FALSE,
    home_score INTEGER,
    away_score INTEGER
);

CREATE TYPE valid_status AS ENUM ('In', 'Out', 'NULL');

CREATE TABLE game_availability (
    game_id INTEGER references games,
    user_id INTEGER references users,
    status valid_status,
    responded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE game_comments (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games,
    user_id INTEGER REFERENCES users,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() 
);

CREATE TABLE game_comment_reactions (
    comment_id INTEGER references game_comments,
    user_id INTEGER references users,
    reaction_type TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

