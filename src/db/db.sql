CREATE SCHEMA test;

CREATE TABLE test.users(
    id integer NOT NULL,
    login character NOT NULL,
    password character varying NOT NULL,
    first_name character varying NOT NULL,
    middle_name character varying NOT NULL,
    last_name character varying NOT NULL,
    bithday timestamp NOT NULL,
    refresh_token character varying NOT NULL,
    create_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO test.users(id, login, password, first_name, middle_name, last_name, bithday, create_at, update_at) VALUES 
(1, 'admin', 'admin', 'test', 'test', 'test', '1996-12-02 17:56:55.993732+03', '2022-11-18 10:56:55.993732+03', '2022-11-18 10:56:55.993732+03');