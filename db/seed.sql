create table episodes(
  episode_id serial primary key,
  episodenumber int,
  title varchar,
  details text
);

create table westenscale(
  westenscale_id serial primary key,
  episodenumber int,
  b float,
  s float,
  a float,
  w float
)