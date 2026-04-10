import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";
import Skill from "../../components/skill";
import ToastNotification from "../../components/toastNotification";
import Form from "../../components/form";
import Fields from "../../components/fields";

import { useState, useEffect } from "react";
import {
  getTecnologias,
  getTecnologiaById,
  criarTecnologia,
  atualizarTecnologia,
  deletarTecnologia,
} from "../../services/tecnologiasService";

const FORM_VAZIO = {
  skill: "",
};

export default function Conhecimentos() {
  const [tecnologias, setTecnologias] = useState([]);
  const [toast, setToast] = useState(null);
  const [formAberto, setFormAberto] = useState(false);
  const [tecnologiaEdit, setTecnologiaEdit] = useState(null);
  const [form, setForm] = useState(FORM_VAZIO);
  const [loading, setLoading] = useState(false);

  // Carregar tecnologias
  useEffect(() => {
    carregarTecnologias();
  }, []);

  async function carregarTecnologias() {
    const data = await getTecnologias();
    setTecnologias(data);
  }

  // Toast
  function mostrarSucesso(msg) {
    setToast({ mensagem: msg, danger: false });
  }

  function mostrarErro(msg) {
    setToast({ mensagem: msg, danger: true });
  }

  // Abrir form novo
  function abrirFormNovo() {
    setTecnologiaEdit(null);
    setForm(FORM_VAZIO);
    setFormAberto(true);
  }

  // Abrir form editar
  async function abrirFormEditar(item) {
    try {
      const data = await getTecnologiaById(item.id);
      setForm({
        skill: data.skill ?? "",
      });
      setTecnologiaEdit(data);
      setFormAberto(true);
    } catch {
      mostrarErro("Erro ao carregar tecnologia.");
    }
  }

  // Fechar form
  function fecharForm() {
    setFormAberto(false);
    setTecnologiaEdit(null);
    setForm(FORM_VAZIO);
  }

  // Atualizar campo do form
  function setCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  // Submit
  async function handleSubmit() {
    setLoading(true);
    try {
      const payload = {
        skill: form.skill,
      };

      if (tecnologiaEdit) {
        await atualizarTecnologia(tecnologiaEdit.id, payload);
        mostrarSucesso("Tecnologia Atualizada");
      } else {
        await criarTecnologia(payload);
        mostrarSucesso("Tecnologia Adicionada");
      }
      fecharForm();
      carregarTecnologias();
    } catch (err) {
      const msg = err.response?.data?.detail ?? "Erro ao salvar tecnologia.";
      mostrarErro(msg);
    } finally {
      setLoading(false);
    }
  }

  // Deletar
  async function handleDelete(item) {
    try {
      await deletarTecnologia(item.id);
      mostrarSucesso("Tecnologia Removida");
      carregarTecnologias();
    } catch (err) {
      const msg = err.response?.data?.detail ?? "Erro ao remover tecnologia.";
      mostrarErro(msg);
    }
  }

  // Colunas
  const colunas = [
    { key: "skill", label: "Skill", mobile: true },
    { key: "dt_criacao", label: "Data Criação", mobile: false },
    { key: "dt_atualizacao", label: "Data Atualização", mobile: false },
  ];

  return (
    <div className="admin-page">
      <Titulo
        titulo="Tecnologias"
        admin={true}
        textoButton="Nova Tecnologia"
        onClick={() => setFormAberto(true)}
      />
      <DataTable
        columns={colunas}
        data={tecnologias}
        onEdit={abrirFormEditar}
        onDelete={handleDelete}
      />
      {toast && (
        <ToastNotification
          mensagem={toast.mensagem}
          danger={toast.danger}
          onClose={() => setToast(null)}
        />
      )}
      {formAberto && (
        <Form
          titulo={tecnologiaEdit ? "Editar Tecnologia" : "Nova Tecnologia"}
          onClose={fecharForm}
          onSubmit={handleSubmit}
          loading={loading}
        >
          <Fields
            type="text"
            placeholder="Nome da tecnologia"
            value={form.skill}
            onChange={(e) => setCampo("skill", e.target.value)}
            className="col-span-2"
            required
          />
        </Form>
      )}
    </div>
  );
}
