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
    id SERIAL,
    level character varying NOT NULL,
    os character varying,
    device character varying,
    url character varying,
    method character varying NOT NULL,
    ip character varying,
    message text,
    create_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

INSERT INTO test.logs ("level",os,device,url,"method",ip,message,create_at) VALUES
	 ('log','{"name":"Windows","version":"10"}','{}',NULL,'POST','::1',NULL,'2023-01-09 09:51:42.965326+03'),
	 ('log','{"name":"Windows","version":"10"}','{}',NULL,'POST','::1','{"login":"stri1ng","password":"********","first_name":"strin1g","middle_name":"st1ring","last_name":"str1ing","bithday":"2023-01-06T13:14:06.602Z"}','2023-01-09 09:54:53.409452+03'),
	 ('log','{"name":"Windows","version":"10"}','{}',NULL,'POST','::1','{"login":"string","password":"********"}','2023-01-09 10:06:58.751954+03'),
	 ('log','{"name":"Windows","version":"10"}','{}',NULL,'GET','::1','{}','2023-01-09 10:07:23.369379+03'),
	 ('log','{"name":"Windows","version":"10"}','{}',NULL,'GET','::1','{}','2023-01-09 10:07:50.346263+03'),
	 ('error','{"name":"Windows","version":"10"}','{}',NULL,'GET','::1','Такой пользователь не найден','2023-01-09 10:08:02.426444+03');
