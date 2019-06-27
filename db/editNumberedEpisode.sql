update episodes set
episodenumber = ($2), title = ($3), details = ($4)
where episode_id = ($1);

update westenscale set 
a = ($5), b = ($6), s = ($7), w = ($8), title = ($3)
where westenscale_id = ($1)