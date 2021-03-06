﻿-- Table: public.tm_site_surf_pre_1h

-- DROP TABLE public.tm_site_surf_pre_1h;

CREATE TABLE public.tm_site_surf_pre_1h
(
    station_id_d double precision NOT NULL,
    lat double precision,
    lon double precision,
    pre_1h double precision,
    s_d_id SERIAL,
    id SERIAL,
    CONSTRAINT tm_site_surf_pre_1h_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tm_site_surf_pre_1h
    OWNER to postgres;