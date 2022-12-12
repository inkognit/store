CREATE SCHEMA test;

CREATE TABLE test.users(
    id SERIAL,
    login character (32) NOT NULL,
    password varchar (255) NOT NULL,
    first_name varchar (32) NOT NULL,
    middle_name varchar (32) NOT NULL,
    last_name varchar (32) NOT NULL,
    bithday timestamp NOT NULL,
    refresh_token varchar (255) NULL,
    create_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (login, id)
);

INSERT INTO test.users(login, password, first_name, middle_name, last_name, bithday, create_at, update_at) VALUES 
('string', '$argon2id$v=19$m=65536,t=3,p=4$anNmNWY0ZXIzZHM0ZjIoNTQyNTZocWFzZHU2KjIwcSMlIWhxKCozKCohJiVHRFdLSDIz$qy4lmIaX0JIfCs7h9Y2MExwMf5dBq5DIvmUwgjkhi9w', 'test', 'test', 'test', '1996-12-02 17:56:55.993732+03', '2022-11-18 10:56:55.993732+03', '2022-11-18 10:56:55.993732+03');