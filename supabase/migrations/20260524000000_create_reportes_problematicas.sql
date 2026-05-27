-- Tipos de dominio
CREATE TYPE public.estado_reporte AS ENUM (
  'abierto',
  'en_revision',
  'en_curso',
  'resuelto',
  'cerrado'
);

CREATE TYPE public.prioridad_reporte AS ENUM (
  'baja',
  'media',
  'alta',
  'critica'
);

-- Reporte principal
CREATE TABLE public.reportes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descripcion text NOT NULL,
  categoria text NOT NULL,
  estado public.estado_reporte NOT NULL DEFAULT 'abierto',
  localidad text NOT NULL,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  fecha timestamptz NOT NULL,
  prioridad public.prioridad_reporte NOT NULL,
  resumen_ia text NOT NULL,
  reportante_id text NOT NULL,
  reportante_nombre text NOT NULL,
  reportante_alias text NOT NULL,
  reportante_email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.reporte_imagenes (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  reporte_id uuid NOT NULL REFERENCES public.reportes(id) ON DELETE CASCADE,
  url text NOT NULL,
  orden smallint NOT NULL DEFAULT 0,
  UNIQUE (reporte_id, orden)
);

CREATE TABLE public.reporte_comentarios (
  id text PRIMARY KEY,
  reporte_id uuid NOT NULL REFERENCES public.reportes(id) ON DELETE CASCADE,
  autor text NOT NULL,
  texto text NOT NULL,
  fecha timestamptz NOT NULL
);

CREATE INDEX reportes_fecha_idx ON public.reportes (fecha DESC);
CREATE INDEX reportes_estado_idx ON public.reportes (estado);
CREATE INDEX reportes_prioridad_idx ON public.reportes (prioridad);
CREATE INDEX reportes_categoria_idx ON public.reportes (categoria);
CREATE INDEX reportes_localidad_idx ON public.reportes (localidad);
CREATE INDEX reporte_imagenes_reporte_id_idx ON public.reporte_imagenes (reporte_id);
CREATE INDEX reporte_comentarios_reporte_id_idx ON public.reporte_comentarios (reporte_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER reportes_updated_at
  BEFORE UPDATE ON public.reportes
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.reportes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reporte_imagenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reporte_comentarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY reportes_select_all ON public.reportes FOR SELECT USING (true);
CREATE POLICY reportes_insert_all ON public.reportes FOR INSERT WITH CHECK (true);
CREATE POLICY reportes_update_all ON public.reportes FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY reportes_delete_all ON public.reportes FOR DELETE USING (true);

CREATE POLICY reporte_imagenes_select_all ON public.reporte_imagenes FOR SELECT USING (true);
CREATE POLICY reporte_imagenes_insert_all ON public.reporte_imagenes FOR INSERT WITH CHECK (true);
CREATE POLICY reporte_imagenes_update_all ON public.reporte_imagenes FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY reporte_imagenes_delete_all ON public.reporte_imagenes FOR DELETE USING (true);

CREATE POLICY reporte_comentarios_select_all ON public.reporte_comentarios FOR SELECT USING (true);
CREATE POLICY reporte_comentarios_insert_all ON public.reporte_comentarios FOR INSERT WITH CHECK (true);
CREATE POLICY reporte_comentarios_update_all ON public.reporte_comentarios FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY reporte_comentarios_delete_all ON public.reporte_comentarios FOR DELETE USING (true);
