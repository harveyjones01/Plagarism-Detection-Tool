DROP TABLE IF EXISTS file_data;

CREATE TABLE IF NOT EXISTS file_data( 
    file_id SERIAL,
    file_name varchar(100),
    file_path varchar(1000),
    file_similarity varchar(10),
    similar_file varchar(100));

