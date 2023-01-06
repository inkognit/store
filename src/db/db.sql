CREATE SCHEMA test;

CREATE TABLE test.users(
    id SERIAL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    first_name character varying NOT NULL,
    middle_name character varying NOT NULL,
    last_name character varying NOT NULL,
    bithday timestamp NOT NULL,
    refresh_token character varying,
    create_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (login, id)
);

INSERT INTO test.users(login, password, first_name, middle_name, last_name, bithday, create_at, update_at) VALUES 
('string', '$argon2id$v=19$m=65536,t=3,p=4$anNmNWY0ZXIzZHM0ZjIoNTQyNTZocWFzZHU2KjIwcSMlIWhxKCozKCohJiVHRFdLSDIz$qy4lmIaX0JIfCs7h9Y2MExwMf5dBq5DIvmUwgjkhi9w', 'test', 'test', 'test', '1996-12-02 17:56:55.993732+03', '2022-11-18 10:56:55.993732+03', '2022-11-18 10:56:55.993732+03');

CREATE TABLE test.logs(
    id character NOT NULL,
    level character NOT NULL,
    os character,
    device character,
    url character,
    method character,
    ip character,
    message character
    create_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);