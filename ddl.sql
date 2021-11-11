create table profile(
    id serial primary key,
    name varchar(42) not null,
    email varchar(42) unique not null,
    password varchar(42) not null,
    coin int default 100
);

insert into profile values(
    default,
    'Gunjan Raj Tiwari',
    'gunjan.tiwari@gmail.com',
    'gunjan123',
    default
);
insert into profile values(
    default,
    'Murli S',
    'murli.s@gmail.com',
    'murli123',
    default
);