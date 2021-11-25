create table profile(
    id serial primary key,
    name varchar(42) not null,
    email varchar(42) unique not null,
    password varchar(42) not null,
    coin int default 100
);

create table post(
    id serial primary key,
    content text not null,
    author int not null
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
    'Elon Musk',
    'elon.m@gmail.com',
    'elon123',
    default
);

update profile set coin=coin+10 where id = 1;