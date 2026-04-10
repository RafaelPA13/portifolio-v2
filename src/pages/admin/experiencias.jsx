import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";
import Skill from "../../components/skill";
import ToastNotification from "../../components/toastNotification";
import Form from "../../components/form";
import Fields from "../../components/fields";

import { useState, useEffect } from "react";
import {
  getExperiencias,
  getExperienciaById,
  criarExperiencia,
  atualizarExperiencia,
  deletarExperiencia,
} from "../../services/experienciasService";

const FORM_VAZIO = {
  cargo: "",
  empresa: "",
  descricao: "",
  dt_inicio: "",
  dt_fim: "",
  atual: false,
  tecnologias: "",
};

export default function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [toast, setToast] = useState(null);
  const [formAberto, setFormAberto] = useState(false);
  const [experienciaEdit, setExperienciaEdit] = useState(null);
  const [form, setForm] = useState(FORM_VAZIO);
  const [loading, setLoading] = useState(false);

  // Carregar experiencias
  useEffect(() => {
    carregarExperiencias();
  }, []);

  async function carregarExperiencias() {
    const data = await getExperiencias();
    setExperiencias(data);
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
    setExperienciaEdit(null);
    setForm(FORM_VAZIO);
    setFormAberto(true);
  }

  // Abrir form editar
  async function abrirFormEditar(item) {
    try {
      const data = await getExperienciaById(item.id);
      setForm({
        cargo: data.cargo ?? "",
        empresa: data.empresa ?? "",
        descricao: data.descricao ?? "",
        dt_inicio: data.dt_inicio ?? "",
        dt_fim: data.dt_fim ?? "",
        atual: data.atual ?? false,
        tecnologias: data.tecnologias
          ? data.tecnologias.map((t) => t.skill).join(", ")
          : "",
      });
      setExperienciaEdit(data);
      setFormAberto(true);
    } catch {
      mostrarErro("Erro ao carregar experiência.");
    }
  }

  // Fechar form
  function fecharForm() {
    setFormAberto(false);
    setExperienciaEdit(null);
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
        cargo: form.cargo,
        empresa: form.empresa,
        descricao: form.descricao,
        dt_inicio: form.dt_inicio,
        dt_fim: form.dt_fim,
        atual: form.atual,
        tecnologias: form.tecnologias,
      };

      if (experienciaEdit) {
        await atualizarExperiencia(experienciaEdit.id, payload);
        mostrarSucesso("Experiência Atualizada");
      } else {
        await criarExperiencia(payload);
        mostrarSucesso("Experiência Adicionada");
      }
      fecharForm();
      carregarExperiencias();
    } catch (err) {
      const msg = err.response?.data?.detail ?? "Erro ao salvar experiência.";
      mostrarErro(msg);
    } finally {
      setLoading(false);
    }
  }

  // Deletar
  async function handleDelete(item) {
    try {
      await deletarExperiencia(item.id);
      mostrarSucesso("Experiência Removida");
      carregarExperiencias();
    } catch (err) {
      const msg = err.response?.data?.detail ?? "Erro ao remover experiência.";
      mostrarErro(msg);
    }
  }

  // Colunas
  const colunas = [
    { key: "cargo", label: "Cargo", mobile: true },
    { key: "empresa", label: "Empresa", mobile: false },
    { key: "periodo", label: "Período", mobile: false },
  ];

  function renderCell(key, value, item) {
    if (key === "tecnologias" && Array.isArray(value)) {
      return (
        <ul className="flex flex-wrap gap-1">
          {value.map((tech) => (
            <Skill
              key={tech.id}
              skill={tech.skill}
              animated={false}
              inicio={false}
              card={true}
            />
          ))}
        </ul>
      );
    }

    if (key === "periodo") {
      const inicio = item.dt_inicio
        ? item.dt_inicio.split("-").reverse().join("/")
        : "—";

      const fim =
        item.atual || !item.dt_fim
          ? "Atual"
          : item.dt_fim.split("-").reverse().join("/");

      return `${inicio} - ${fim}`;
    }

    return value ?? "—";
  }

  return (
    <div className="admin-page">
      <Titulo
        titulo="Experiências"
        admin={true}
        textoButton="Nova Experiência"
        onClick={() => setFormAberto(true)}
      />
      <DataTable
        columns={colunas}
        data={experiencias}
        renderCell={renderCell}
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
          titulo={experienciaEdit ? "Editar Experiência" : "Nova Experiência"}
          onClose={fecharForm}
          onSubmit={handleSubmit}
          loading={loading}
        >
          {/* Atual */}
          <label className="col-span-2 flex items-center gap-3 cursor-pointer select-none group">
            <div
              onClick={() => setCampo("atual", !form.atual)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 shrink-0
                ${
                  form.atual
                    ? "bg-amber-400 border-amber-400"
                    : "bg-slate-100 border-slate-300 group-hover:border-amber-400"
                }`}
            >
              {form.atual && (
                <svg
                  className="w-3 h-3 text-indigo-950"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="2,6 5,9 10,3" />
                </svg>
              )}
            </div>
            <span className="text-sm text-slate-600">Emprego atual</span>
          </label>

          {/* Cargo */}
          <Fields
            type="text"
            placeholder="Cargo na empresa"
            value={form.cargo}
            onChange={(e) => setCampo("cargo", e.target.value)}
            className="col-span-2"
            required
          />

          {/* Empresa  */}
          <Fields
            type="text"
            placeholder="Empresa"
            value={form.empresa}
            onChange={(e) => setCampo("empresa", e.target.value)}
            className="col-span-2"
            required
          />

          {/* Descrição */}
          <Fields
            textarea
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setCampo("descricao", e.target.value)}
            className={"col-span-2"}
            required
          />

          {/* Data de inicio */}
          <Fields
            type="date"
            placeholder="Data de início"
            value={form.dt_inicio}
            onChange={(e) => setCampo("dt_inicio", e.target.value)}
            className="col-span-1"
            required
          />

          {/* Data de conclusão */}
          <Fields
            type="date"
            placeholder="Data de conclusão"
            value={form.dt_fim}
            onChange={(e) => setCampo("dt_fim", e.target.value)}
            className={`col-span-1 ${form.atual ? "opacity-40 pointer-events-none" : ""}`}
            required={!form.atual}
          />

          {/* Tecnologias */}
          <Fields
            type="text"
            placeholder="Tecnologias (separadas por vírgula)"
            value={form.tecnologias}
            onChange={(e) => setCampo("tecnologias", e.target.value)}
            className="col-span-2"
            required
          />
        </Form>
      )}
    </div>
  );
}
