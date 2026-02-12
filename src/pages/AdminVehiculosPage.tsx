import { useEffect, useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { type Marca, listMarcasApi } from "../api/marcas.api";
import { type Shows, listVehiculosAdminApi, createVehiculoApi, updateVehiculoApi, deleteVehiculoApi } from "../api/vehiculos.api";

export default function AdminVehiculosPage() {
  const [items, setItems] = useState<Shows[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [movie_title, setMovie_title] = useState("");
  const [genre, setGenre] = useState("");
  const [duration_min, setDurationMin] = useState<number | null>(null);
//   const [is_active, setIsActive] = useState<boolean>;

  const load = async () => {
    try {
      setError("");
      const data = await listVehiculosAdminApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar vehículos. ¿Login? ¿Token admin?");
    }
  };

  const loadMarcas = async () => {
    try {
      const data = await listMarcasApi();
      setMarcas(data.results); // DRF paginado
      if (!duration_min && data.results.length > 0) setDurationMin(data.results[0].id);
    } catch {
      // si falla, no bloquea la pantalla
    }
  };

//   useEffect(() => { load(); loadMarcas(); }, []);

//   const save = async () => {
//     try {
//       setError("");
//       if (!movie_title) return setError("Seleccione una pelicula");
//       if (!.trim() || !placa.trim()) return setError("Modelo y placa son requeridos");

//       const payload = {
//         marca: Number(marca),
//         modelo: modelo.trim(),
//         anio: Number(anio),
//         placa: placa.trim(),
//         color: color.trim(),
//       };

//       if (editId) await updateVehiculoApi(editId, payload);
//       else await createVehiculoApi(payload as any);

//       setEditId(null);
//       setModelo("");
//       setPlaca("");
//       setColor("");
//       await load();
//     } catch {
//       setError("No se pudo guardar vehículo. ¿Token admin?");
//     }
//   };

//   const startEdit = (v: Shows) => {
//     setEditId(v.id);
//     setMovie_title(v.movie_title);
//     setModelo(v.genre);
//     setAnio(v.duration_min);
//     setIsActive(v.is_active);
//   };

  const remove = async (id: number) => {
    try {
      setError("");
      await deleteVehiculoApi(id);
      await load();
    } catch {
      setError("No se pudo eliminar vehículo. ¿Token admin?");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin Vehículos (Privado)</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack spacing={2} sx={{ mb: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

            <FormControl sx={{ width: 260 }}>
              <InputLabel id="marca-label">Marca</InputLabel>
              <Select
                labelId="marca-label"
                label="Marca"
              >
                {marcas.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.nombre} (#{m.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <TextField label="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} fullWidth />
            <TextField label="Año" type="number" value={anio} onChange={(e) => setAnio(Number(e.target.value))} sx={{ width: 160 }} />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField label="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} sx={{ width: 220 }} />
            <TextField label="Color" value={color} onChange={(e) => setColor(e.target.value)} sx={{ width: 220 }} />

            <Button variant="contained" onClick={save}>{editId ? "Actualizar" : "Crear"}</Button>
            <Button variant="outlined" onClick={() => { setEditId(null); setModelo(""); setPlaca(""); setColor(""); }}>Limpiar</Button>
            <Button variant="outlined" onClick={() => { load(); loadMarcas(); }}>Refrescar</Button> */}
          </Stack>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Color</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                {/* <TableCell>{v.marca_nombre ?? v.marca}</TableCell>
                <TableCell>{v.modelo}</TableCell>
                <TableCell>{v.anio}</TableCell>
                <TableCell>{v.placa}</TableCell>
                <TableCell>{v.color || "-"}</TableCell> */}
                <TableCell align="right">
                  {/* <IconButton onClick={() => startEdit(v)}><EditIcon /></IconButton> */}
                  <IconButton onClick={() => remove(v.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}