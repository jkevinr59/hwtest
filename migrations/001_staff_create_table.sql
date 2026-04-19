CREATE TABLE public.staff (
	id bigserial NOT NULL PRIMARY KEY,
    name varchar(255) NOT NULL,
    position varchar(255) NOT NULL,
    join_date date NOT NULL,
    release_date date NULL,
    years_of_experience int NOT NULL,
    salary numeric(10, 2) NOT NULL
);
