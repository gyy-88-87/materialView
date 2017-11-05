﻿-- Table: public.rm_site_surf_gl

-- DROP TABLE public.rm_site_surf_gl;

CREATE TABLE public.rm_site_surf_gl
(
    station_id_d double precision NOT NULL,
    lat double precision,
    lon double precision,
    alti double precision,
    station_type double precision,
    day double precision,
    hour double precision,
    min double precision,
    prs_sea double precision,
    tem double precision,
    prs double precision,
    dpt double precision,
    win_d double precision,
    win_s double precision,
    pre_1h double precision,
    pre_6h double precision,
    pre_24h double precision,
    q_prs double precision,
    q_prs_sea double precision,
    q_win_d double precision,
    q_win_s double precision,
    q_tem double precision,
    q_dpt double precision,
    q_pre_1h double precision,
    q_pre_6h double precision,
    q_pre_24h double precision,
    station_id_c double precision,
    s_d_id bigint
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.rm_site_surf_gl
    OWNER to postgres;