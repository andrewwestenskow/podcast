insert into episodes(episodenumber, title, details)
values($1, $2, $3);

insert into westenscale(episodenumber, b, s, a, w, title)
values($1, $4, $5, $6, $7, $2)