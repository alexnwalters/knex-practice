begin;

insert into blogful_articles
    (title, content, date_published)
values
    ('article 1', 'test 1', '2018-01-01 12:00:00'),
    ('article 2', 'test 2', '2018-02-02 12:00:00'),
    ('article 3', 'test 3', '2018-03-03 12:00:00'),
    ('article 4', 'test 4', '2018-04-04 12:00:00'),
    ('article 5', 'test 5', '2018-05-05 12:00:00'),
    ('article 6', 'test 6', '2018-06-06 12:00:00'),
    ('article 7', 'test 7', '2018-07-07 12:00:00'),
    ('article 8', 'test 8', '2018-08-08 12:00:00'),
    ('article 9', 'test 9', '2018-09-09 12:00:00'),
    ('article 10', 'test 10', '2018-10-10 12:00:00'),
    ('post 1', 'hello 1', now() - '10 days'::interval),
    ('post 2', 'hello 2', now() - '9 days'::interval),
    ('post 3', 'hello 3', now() - '8 days'::interval),
    ('post 4', 'hello 4', now() - '7 days'::interval),
    ('post 5', 'hello 5', now() - '6 days'::interval),
    ('post 6', 'hello 6', now() - '5 days'::interval),
    ('post 7', 'hello 7', now() - '4 days'::interval),
    ('post 8', 'hello 8', now() - '3 days'::interval),
    ('post 9', 'hello 9', now() - '2 days'::interval),
    ('post 10', 'hello 10', now() - '1 days'::interval);

commit;    
