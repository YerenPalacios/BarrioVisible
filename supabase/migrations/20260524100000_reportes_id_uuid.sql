-- Migra ids de reportes de text a uuid (requiere tablas vacías).
TRUNCATE public.reporte_comentarios, public.reporte_imagenes, public.reportes;

ALTER TABLE public.reporte_comentarios
  DROP CONSTRAINT IF EXISTS reporte_comentarios_reporte_id_fkey;

ALTER TABLE public.reporte_imagenes
  DROP CONSTRAINT IF EXISTS reporte_imagenes_reporte_id_fkey;

ALTER TABLE public.reportes
  ALTER COLUMN id TYPE uuid USING id::uuid;

ALTER TABLE public.reporte_imagenes
  ALTER COLUMN reporte_id TYPE uuid USING reporte_id::uuid;

ALTER TABLE public.reporte_comentarios
  ALTER COLUMN reporte_id TYPE uuid USING reporte_id::uuid;

ALTER TABLE public.reporte_imagenes
  ADD CONSTRAINT reporte_imagenes_reporte_id_fkey
  FOREIGN KEY (reporte_id) REFERENCES public.reportes(id) ON DELETE CASCADE;

ALTER TABLE public.reporte_comentarios
  ADD CONSTRAINT reporte_comentarios_reporte_id_fkey
  FOREIGN KEY (reporte_id) REFERENCES public.reportes(id) ON DELETE CASCADE;
