-- Convierte categoria de enum a text libre.
ALTER TABLE public.reportes
  ALTER COLUMN categoria TYPE text USING categoria::text;

DROP TYPE public.categoria_problematica;
