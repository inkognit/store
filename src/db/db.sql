-- DROP SCHEMA test;

CREATE SCHEMA test AUTHORIZATION testadmin;

-- DROP SEQUENCE test.logs_id_seq;

CREATE SEQUENCE test.logs_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE test.logs_id_seq1;

CREATE SEQUENCE test.logs_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE test.roles_access_level_seq;

CREATE SEQUENCE test.roles_access_level_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE test.roles_access_level_seq1;

CREATE SEQUENCE test.roles_access_level_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE test.roles_id_seq;

CREATE SEQUENCE test.roles_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE test.roles_id_seq1;

CREATE SEQUENCE test.roles_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE test.users_id_seq;

CREATE SEQUENCE test.users_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE test.users_user_id_seq;

CREATE SEQUENCE test.users_user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- test.logs definition

-- Drop table

-- DROP TABLE test.logs;

CREATE TABLE test.logs (
	id serial4 NOT NULL,
	"level" varchar NOT NULL,
	os varchar NULL,
	device varchar NULL,
	url varchar NULL,
	"method" varchar NOT NULL,
	ip varchar NULL,
	message text NULL,
	create_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT logs_pkey PRIMARY KEY (id)
);


-- test.roles definition

-- Drop table

-- DROP TABLE test.roles;

CREATE TABLE test.roles (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	access_level serial4 NOT NULL,
	user_create int4 NULL DEFAULT 0,
	user_update int4 NULL DEFAULT 0,
	create_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	update_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT roles_pkey PRIMARY KEY (id)
);


-- test.users definition

-- Drop table

-- DROP TABLE test.users;

CREATE TABLE test.users (
	user_id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	login varchar NOT NULL,
	"password" varchar NOT NULL,
	roles_id int4 NULL DEFAULT 1,
	first_name varchar NOT NULL,
	middle_name varchar NOT NULL,
	last_name varchar NOT NULL,
	bithday timestamp NOT NULL,
	refresh_token varchar NULL,
	avatar text NULL,
	create_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	update_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT users_pkey PRIMARY KEY (user_id),
	CONSTRAINT users_ukey UNIQUE (login),
	CONSTRAINT users_fkey_users_roles FOREIGN KEY (roles_id) REFERENCES test.roles(id)
);

INSERT INTO
    test.roles(id,"name",access_level,user_create,user_update)
VALUES
    (1, 'Заказчик', 0, 1, 1),
    (2, 'Клиент', 1, 1, 1),
    (3, 'Админ', 2, 1, 1);


INSERT INTO
    test.users(
        login,
        password,
        roles_id,
        first_name,
        middle_name,
        last_name,
        bithday,
        create_at,
        update_at
    )
VALUES
    (
        'string',
        '$argon2id$v=19$m=65536,t=3,p=4$anNmNWY0ZXIzZHM0ZjIoNTQyNTZocWFzZHU2KjIwcSMlIWhxKCozKCohJiVHRFdLSDIz$qy4lmIaX0JIfCs7h9Y2MExwMf5dBq5DIvmUwgjkhi9w',
        1,
        'test',
        'test',
        'test',
        '1996-12-02 17:56:55.993732+03',
        '2022-11-18 10:56:55.993732+03',
        '2022-11-18 10:56:55.993732+03'
    );


INSERT INTO
    test.logs ("level",os,device,url,"method",ip,message,create_at)
VALUES
    ('log','{"name":"Windows","version":"10"}','{}',NULL,'POST','::1',NULL,'2023-01-09 09:51:42.965326+03'),
    ('log','{"name":"Windows","version":"10"}','{}',NULL,'POST','::1','{"login":"stri1ng","password":"********","first_name":"strin1g","middle_name":"st1ring","last_name":"str1ing","bithday":"2023-01-06T13:14:06.602Z"}',        '2023-01-09 09:54:53.409452+03'    ),
    ('log','{"name":"Windows","version":"10"}','{}',NULL,'POST','::1','{"login":"string","password":"********"}','2023-01-09 10:06:58.751954+03'),
    ('log','{"name":"Windows","version":"10"}','{}',NULL,'GET','::1','{}','2023-01-09 10:07:23.369379+03'),
    ('log','{"name":"Windows","version":"10"}','{}',NULL,'GET','::1','{}','2023-01-09 10:07:50.346263+03'),
    ('error','{"name":"Windows","version":"10"}','{}',NULL,'GET','::1','Такой пользователь не найден','2023-01-09 10:08:02.426444+03');
