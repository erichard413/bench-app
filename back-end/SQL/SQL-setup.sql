-- TO USE: In psql shell type command: \i SQL-setup.sql

\echo 'Delete and recreate benchapp db - (DO NOT RUN IN PRODUCTION)?'
\prompt 'Return for yes or control-C to cancel > ' foo

\connect bench_app
DROP TABLE IF EXISTS users, teams, rosters, seasons, team_seasons, positions, roster_positions, games, game_availability, game_comments, game_comment_reactions CASCADE;
\connect postgres;
DROP DATABASE bench_app;
CREATE DATABASE bench_app;

\connect bench_app

CREATE TYPE position_type AS ENUM ('RW', 'LW', 'C', 'D', 'G');
CREATE TYPE valid_status AS ENUM ('In', 'Out', 'NULL');

\i schema.sql
\i dummy-data.sql

\echo 'Delete and recreate bench_app_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo
\connect bench_app_test
DROP TABLE IF EXISTS users, teams, rosters, seasons, team_seasons, positions, roster_positions, games, game_availability, game_comments, game_comment_reactions CASCADE;
\connect postgres;

DROP DATABASE bench_app_test;
CREATE DATABASE bench_app_test;
\connect bench_app_test

CREATE TYPE position_type AS ENUM ('RW', 'LW', 'C', 'D', 'G');
CREATE TYPE valid_status AS ENUM ('In', 'Out', 'NULL');

\i schema.sql
\i dummy-data.sql

