-- asumsi jumlah salary pada akhir tahun 2021
select sum(s.salary) from staff s where extract(year from s.join_date) <= 2021 and (s.release_date is null or extract(year from s.release_date) >= 2021)