CREATE TABLE public.satellite_file_data_head
(
    s_f_id SERIAL,
    data_logo character varying(255) COLLATE pg_catalog."default" NOT NULL,
    data_name character varying(255) COLLATE pg_catalog."default",
    data_code character varying(255) COLLATE pg_catalog."default",
    retrieve_start_time timestamp without time zone,
    retrieve_end_time timestamp without time zone,
    retrieve_process_time double precision,
    data_time timestamp without time zone,
    file_path character varying(255) COLLATE pg_catalog."default",
    data_start_time timestamp without time zone,
    data_end_time timestamp without time zone,
    longitude_latitude_scope character varying(255) COLLATE pg_catalog."default",
    data_num character varying(255) COLLATE pg_catalog."default",
    total_count character varying(255) COLLATE pg_catalog."default",
    sys_conn_state character varying(255) COLLATE pg_catalog."default",
    return_abnormal_info character varying(255) COLLATE pg_catalog."default",
    user_id character varying(255) COLLATE pg_catalog."default",
    system_name character varying(255) COLLATE pg_catalog."default",
    data_type integer,
    mode_type integer,
    sate_name character varying(255) COLLATE pg_catalog."default",
    sate_file_num character varying(255) COLLATE pg_catalog."default",
    id SERIAL,
    CONSTRAINT satellite_file_data_head_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.satellite_file_data_head
    OWNER to postgres;
