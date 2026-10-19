-- =========================
-- INSERT USERS
-- =========================
INSERT INTO users (first_name, last_name, email, username, password, display_name)
VALUES
('John', 'Doe', 'john@example.com', 'johndoe', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'johndoe'),
('Jane', 'Smith', 'jane@example.com', 'janesmith', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'Janesmith'),
('Mike', 'Johnson', 'mike@example.com', 'mikej', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'MikeJ'),
('Emily', 'Davis', 'emily@example.com', 'emilyd', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'emilyD'),
('Chris', 'Brown', 'chris@example.com', 'chrisb', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'ChrisB'),
('Alex', 'Wilson', 'alex@example.com', 'alexw', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'AlexW'),
('Ryan', 'Miller', 'ryan@example.com', 'ryanm', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'MillerTime'),
('Sarah', 'Taylor', 'sarah@example.com', 'saraht', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'SarahT'),
('David', 'Anderson', 'david@example.com', 'davida', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'DAnderson'),
('Kevin', 'Thomas', 'kevin@example.com', 'kevint', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'KT'),
('Ashley', 'Moore', 'ashley@example.com', 'ashleym', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'AshM'),
('Brian', 'Jackson', 'brian@example.com', 'brianj', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'BJack'),
('Matt', 'White', 'matt@example.com', 'mattw', '$2b$12$1NB.CwAL6v1/Tpx.hpdKVOUeQburecgSA1rEOz4otzQe/8Ju/RB8e', 'Whitey');

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
('Falcons'),
('Bruins'),
('Ice Dogs'),
('Rangers');


-- =========================
-- INSERT SEASONS
-- =========================
INSERT INTO seasons (name, start_date, end_date)
VALUES
('Spring 2025', '2025-03-01', '2025-06-01'),
('Fall 2025', '2025-09-01', '2025-12-01'),
('Spring 2026', '2026-03-01', '2026-06-01'),
('Fall 2026', '2026-09-01', '2026-12-01');

-- =========================
-- TEAM_SEASONS
-- =========================
INSERT INTO team_seasons (team_id, season_id)
VALUES
(1,1), (2,1), (3,1),
(1,2), (2,2), (4, 1),
(5, 1), (3, 2), (4, 2),
(5, 2), (6, 2), (1, 3),
(2, 3), (3, 3), (4, 3),
(6, 3), (1, 4), (2, 4),
(4, 4), (5, 4), (6, 4); 

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
(5,2,2,18,'captain'),
(7, 1, 1, 17, 'captain'),
(8, 1, 1, 21, 'player'),
(9, 3, 1, 11, 'player'),
(10, 4, 1, 6, 'captain'),
(11, 5, 1, 31, 'goalie'),
(12, 2, 1, 14, 'player'),
(1, 4, 2, 9, 'player'),
(2, 4, 2, 12, 'player'),
(7, 2, 2, 17, 'captain'),
(8, 3, 2, 21, 'player'),
(9, 4, 2, 11, 'player'),
(10, 6, 2, 6, 'captain'),
(11, 5, 2, 31, 'goalie'),
(12, 6, 2, 14, 'player'),
(13, 2, 2, 19, 'player'),
(14, 1, 2, 25, 'player'),
(1, 1, 3, 9, 'captain'),
(2, 1, 3, 12, 'player'),
(3, 2, 3, 30, 'goalie'),
(4, 3, 3, 7, 'player'),
(5, 2, 3, 18, 'captain'),
(7, 4, 3, 17, 'captain'),
(8, 1, 3, 21, 'player'),
(9, 4, 3, 11, 'player'),
(10, 6, 3, 6, 'captain'),
(11, 5, 3, 31, 'goalie'),
(12, 2, 3, 14, 'player'),
(13, 3, 3, 19, 'player'),
(14, 6, 3, 25, 'player'),
(1, 1, 4, 9, 'captain'),
(2, 4, 4, 12, 'player'),
(3, 2, 4, 30, 'goalie'),
(5, 2, 4, 18, 'captain'),
(6, 5, 4, 22, 'player'),
(7, 4, 4, 17, 'captain'),
(8, 1, 4, 21, 'player'),
(9, 6, 4, 11, 'player'),
(10, 6, 4, 6, 'captain'),
(11, 5, 4, 31, 'goalie'),
(12, 2, 4, 14, 'player'),
(13, 5, 4, 19, 'player'),
(14, 6, 4, 25, 'player');


-- =========================
-- ROSTER POSITIONS
-- =========================
INSERT INTO roster_positions (user_id, team_id, season_id, position_id)
VALUES
(1,1,1,'C'),
(2,1,1,'RW'),
(3,2,1,'G'),
(4,3,1,'D'),
(5,2,2,'LW'),
(7,1,1,'C'),
(8, 1, 1, 'RW'),
(9, 3, 1, 'LW'),
(10, 4, 1, 'D'),
(11, 5, 1, 'G'),
(12, 2, 1, 'RW'),
(1, 4, 2, 'C'),
(2, 4, 2, 'RW'),
(7, 2, 2, 'C'),
(8, 3, 2, 'LW'),
(9, 4, 2, 'LW'),
(10, 6, 2, 'D'),
(11, 5, 2, 'G'),
(12, 6, 2, 'RW'),
(13, 2, 2, 'D'),
(14, 1, 2, 'LW'),
(1, 1, 3, 'LW'),
(2, 1, 3, 'RW'),
(3, 2, 3, 'G'),
(4, 3, 3, 'D'),
(5, 2, 3, 'C'),
(7, 4, 3, 'LW'),
(8, 1, 3, 'RW'),
(9, 4, 3, 'C'),
(10, 6, 3, 'D'),
(11, 5, 3, 'G'),
(12, 2, 3, 'RW'),
(13, 3, 3, 'D'),
(14, 6, 3, 'C'),
(1, 1, 4, 'LW'),
(2, 4, 4, 'RW'),
(3, 2, 4, 'G'),
(5, 2, 4, 'C'),
(6, 5, 4, 'D'),
(7, 4, 4, 'LW'),
(8, 1, 4, 'RW'),
(9, 6, 4, 'C'),
(10, 6, 4, 'D'),
(11, 5, 4, 'G'),
(12, 2, 4, 'RW'),
(13, 5, 4, 'D'),
(14, 6, 4, 'C');

-- =========================
-- GAMES
-- =========================
INSERT INTO games (season_id, date_time, place, home_team_id, away_team_id, is_played, home_score, away_score)
VALUES
(1, '2025-03-10 18:00:00', 'Arena A', 1, 2, TRUE, 3, 2),
(1, '2025-03-15 19:00:00', 'Arena B', 2, 3, TRUE, 1, 4),
(1, '2025-03-20 20:00:00', 'Arena C', 1, 3, FALSE, NULL, NULL),
(2, '2025-09-10 18:00:00', 'Arena A', 1, 2, FALSE, NULL, NULL),
(1, '2025-03-25 18:00:00', 'Arena D', 4, 5, TRUE, 5, 3),
(1, '2025-04-01 19:00:00', 'Arena A', 1, 4, TRUE, 2, 2),
(2, '2025-09-15 19:00:00', 'Arena B', 4, 6, TRUE, 4, 1),
(2, '2025-09-20 20:00:00', 'Arena C', 3, 5, TRUE, 2, 5),
(2, '2025-10-01 18:00:00', 'Arena A', 2, 4, TRUE, 3, 4),
(3, '2026-03-10 18:00:00', 'Arena A', 1, 2, TRUE, 4, 2),
(3, '2026-03-15 19:00:00', 'Arena B', 3, 4, TRUE, 1, 3),
(3, '2026-03-20 20:00:00', 'Arena C', 6, 1, TRUE, 2, 6),
(3, '2026-04-01 18:00:00', 'Arena D', 2, 3, FALSE, NULL, NULL),
(4, '2026-09-10 18:00:00', 'Arena A', 1, 4, TRUE, 3, 2),
(4, '2026-09-17 19:00:00', 'Arena B', 2, 6, TRUE, 2, 4),
(4, '2026-10-22 20:00:00', 'Arena C', 5, 6, FALSE, NULL, NULL);


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
(3,2,'In'),
(5, 7, 'In'),
(5, 8, 'In'),
(5, 10, 'Out'),
(5, 11, 'In'),
(6, 1, 'In'),
(6, 7, 'Out'),
(7, 1, 'In'),
(7, 2, 'In'),
(7, 10, 'In'),
(8, 8, 'In'),
(8, 11, 'In'),
(8, 12, 'Out'),
(9, 7, 'In'),
(9, 13, 'Out'),
(10, 1, 'In'),
(10, 2, 'In'),
(10, 3, 'In'),
(10, 8, 'Out'),
(11, 4, 'In'),
(11, 7, 'In'),
(11, 9, 'Out'),
(12, 10, 'In'),
(12, 14, 'In'),
(12, 1, 'Out'),
(13, 2, 'In'),
(13, 3, 'In'),
(14, 1, 'In'),
(14, 2, 'In'),
(14, 7, 'In'),
(15, 3, 'In'),
(15, 5, 'Out'),
(15, 12, 'In'),
(16, 6, 'In'),
(16, 10, 'In'),
(16, 13, 'Out');



-- =========================
-- GAME COMMENTS
-- =========================
INSERT INTO game_comments (game_id, user_id, message)
VALUES
(1,1,'Great game everyone!'),
(1,2,'Tough loss but we played well'),
(2,3,'Nice win!'),
(3,4,'Looking forward to this match'),
(5, 7, 'Huge win tonight, boys!'),
(5, 10, 'We will get you in the rematch.'),
(7, 1, 'Great team effort!'),
(8, 11, 'Defense was solid tonight.'),
(10, 2, 'That was one of our best games this season.'),
(11, 7, 'Good game everyone.'),
(14, 8, 'Ready for another season!'),
(15, 12, 'Bring the energy next week.');

-- =========================
-- GAME COMMENT REACTIONS
-- =========================
INSERT INTO game_comment_reactions (comment_id, user_id, reaction_type)
VALUES
(1,2,'like'),
(1,3,'like'),
(2,1,'support'),
(3,4,'like'),
(4,1,'excited'),
(5, 8, 'like'),
(5, 10, 'excited'),
(6, 7, 'support'),
(7, 2, 'like'),
(7, 3, 'like'),
(8, 4, 'support'),
(9, 1, 'excited'),
(9, 7, 'like'),
(10, 13, 'like'),
(11, 1, 'like'),
(11, 7, 'excited'),
(12, 5, 'support');