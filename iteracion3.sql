 STORE PROCEDURE TraerVisitantesCCXFecha(Param1 int, Param2 DateTime)
BEGIN
	SELECT Visitantes.*
	FROM Visistantes
	WHERE (IDCentroCoemrcial = Param1
	AND FechaVisita = Param2
	AND IdTipoVisitante = Param3)
END

CREATE TABLE VISITANTE
(ID_VISITA NUMBER,
ID NUMBER,
FechaVisita DATE NOT NULL, 
HoraIngreso DATE NOT NULL,
HoraSalida DATE NOT NULL,
ID_LOCAL NUMBER,
IdCentroComercial NUMBER,
IdTipoVisitante NUMBER,
CONSTRAINT VISTANTE_PK PRIMARY KEY(ID_VISITA));
ALTER TABLE VISITANTE
ADD CONSTRAINT fk_VISITANTE
    FOREIGN KEY (ID_LOCAL,IdCentroComercial);
ENABLE;

CREATE TABLE TIPO_ESPACIO

(ID NUMBER,
NOMBRE VARCHAR(25),
ES_AREA_COMUN VARCHAR(15),
CONSTRAINT TIPO_ESPACIO_PK PRIMARY KEY(ID));


SELECT VISITANTE.* , Local.Name
FROM VISITANTE, Local, TIPO_ESPACIO
WHERE(
Local.IdTipoEspacio = TipoEspacio.Id
AND TipoEspacio.EsAreaComun = false
AND VISITANTE.IdCentroCoemrcial = 1
AND VISITANTE.IdLocal = Local.Id
AND VISITANTE.FechaVisita = "20/01/2020")

SELECT Visitante.FechaVisita, COUNT(Visitante.Id) AS NUMVITANTES
FROM Visitante, Local, TipoEspacio
WHERE Visitante.IDCentroCoemrcial = 1
AND Visitante.IdLocal = Loca.Id
AND Local.EsAreaComun = false
GROUP BY Visistante.FechaVisita
ORDER BY NUMVITANTES DESC

SELECT TipoEspacio.Id, TipoEspacio.Name, SUM(Local.Aforo) AS AforoXTipoEspacio
From TipoEspacio, Local
WHERE TipoEspacio.Id = Local.IdTipoEspacio
AND TipoEspacio.EsAreaComun = false
GROUP BY TipoEspacio.Id, TipoEspacio.Name

NUMVISITANTES/AforoXTipoEspacio > 0.9


CREATE STOREPROCEDURE ConsultaVisitantes (CC as int, FechVisita as DateTime)
BEGIN
	SELECT VisitanteXFecha.FechaVisita, VisitanteXFecha.NUMVITANTES, TotalAforoXTipoEspacio.AforoTotal
	FROM
	(
	SELECT Visitante.FechaVisita, COUNT(Visitante.Id) AS NUMVITANTES
	FROM Visitante, Local, TipoEspacio
	WHERE Visitante.IDCentroCoemrcial = @CC
	AND Visitante.IdLocal = Loca.Id
	AND Local.EsAreaComun = false
	GROUP BY Visistante.FechaVisita
	ORDER BY NUMVITANTES DESC
	) AS VisitanteXFecha
	,
	(
	SELECT SUM(Local.Aforo) AS AforoTotal
	From TipoEspacio, Local
	WHERE TipoEspacio.Id = Local.IdTipoEspacio
	AND TipoEspacio.EsAreaComun = false
	) AS TotalAforoXTipoEspacio
	WHERE VisitanteXFecha.NUMVITANTES/TotalAforoXTipoEspacio.AforoTotal > 0.90
	AND FechaVisita = @FechaVisita
END

