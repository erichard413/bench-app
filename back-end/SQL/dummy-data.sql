-- =========================
-- INSERT USERS
-- =========================
INSERT INTO users (first_name, last_name, email, username, password, display_name)
VALUES
('John', 'Doe', 'john@example.com', 'johndoe', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'johndoe'),
('Jane', 'Smith', 'jane@example.com', 'janesmith', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'Janesmith'),
('Mike', 'Johnson', 'mike@example.com', 'mikej', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'MikeJ'),
('Emily', 'Davis', 'emily@example.com', 'emilyd', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'emilyD'),
('Chris', 'Brown', 'chris@example.com', 'chrisb', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'ChrisB');

-- =========================
-- INSERT ADMIN USER
-- =========================
INSERT INTO users (first_name, last_name, email, username, password, display_name, is_admin)
VALUES
('Admin', 'User', 'admin@admin.com', 'benchappadmin', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'admin', TRUE);

-- =========================
-- INSERT TEAMS
-- =========================
INSERT INTO teams (team_name)
VALUES
('Sharks'),
('Wolves'),
('Falcons');

-- =========================
-- INSERT SEASONS
-- =========================
INSERT INTO seasons (name, start_date, end_date)
VALUES
('Spring 2025', '2025-03-01', '2025-06-01'),
('Fall 2025', '2025-09-01', '2025-12-01');

-- =========================
-- TEAM_SEASONS
-- =========================
INSERT INTO team_seasons (team_id, season_id)
VALUES
(1,1), (2,1), (3,1),
(1,2), (2,2);

-- =========================
-- POSITIONS
-- =========================
INSERT INTO positions (pos_abbr)
VALUES
('RW'), ('LW'), ('C'), ('D'), ('G');

-- =========================
-- ROSTERS
-- =========================
INSERT INTO rosters (user_id, team_id, season_id, jersey_number, role)
VALUES
(1,1,1,9,'captain'),
(2,1,1,12,'player'),
(3,2,1,30,'goalie'),
(4,3,1,7,'player'),
(5,2,2,18,'captain');

-- =========================
-- ROSTER POSITIONS
-- =========================
INSERT INTO roster_positions (user_id, team_id, season_id, position_id)
VALUES
(1,1,1,'C'),
(2,1,1,'RW'),
(3,2,1,'G'),
(4,3,1,'D'),
(5,2,2,'LW');

-- =========================
-- GAMES
-- =========================
INSERT INTO games (season_id, date_time, place, home_team_id, away_team_id, is_played, home_score, away_score)
VALUES
(1, '2025-03-10 18:00:00', 'Arena A', 1, 2, TRUE, 3, 2),
(1, '2025-03-15 19:00:00', 'Arena B', 2, 3, TRUE, 1, 4),
(1, '2025-03-20 20:00:00', 'Arena C', 1, 3, FALSE, NULL, NULL),
(2, '2025-09-10 18:00:00', 'Arena A', 1, 2, FALSE, NULL, NULL);

-- =========================
-- GAME AVAILABILITY
-- =========================
INSERT INTO game_availability (game_id, user_id, status)
VALUES
(1,1,'In'),
(1,2,'Out'),
(1,3,'In'),
(2,3,'In'),
(2,4,'Out'),
(3,1,'NULL'),
(3,2,'In');

-- =========================
-- GAME COMMENTS
-- =========================
INSERT INTO game_comments (game_id, user_id, message)
VALUES
(1,1,'Great game everyone!'),
(1,2,'Tough loss but we played well'),
(2,3,'Nice win!'),
(3,4,'Looking forward to this match');

-- =========================
-- GAME COMMENT REACTIONS
-- =========================
INSERT INTO game_comment_reactions (comment_id, user_id, reaction_type)
VALUES
(1,2,'like'),
(1,3,'like'),
(2,1,'support'),
(3,4,'like'),
(4,1,'excited');