import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";
import Skill from "../../components/skill";
import ToastNotification from "../../components/toastNotification";
import Form from "../../components/form";
import Fields from "../../components/fields";
import FileDrop from "../../components/filedrop";

import { useState, useEffect } from "react";
import {
  getProjetos,
  getProjetoById,
  criarProjeto,
  atualizarProjeto,
  deletarProjeto,
} from "../../services/projtetosService";

const FORM_VAZIO = {
  nome: "",
  resumo: "",
  descricao: "",
  link_projeto: "",
  tecnologias: "",
  tipoRepo: "unico",
  link_unico: "",
  link_backend: "",
  link_frontend: "",
  imagem: null,
};

export default function ProjetosAdmin() {
  const [projetos, setProjetos] = useState([]);
  const [toast, setToast] = useState(null);
  const [formAberto, setFormAberto] = useState(false);
  const [projetoEdit, setProjetoEdit] = useState(FORM_VAZIO);
  const [form, setForm] = useState(FORM_VAZIO);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carregar projetos
  useEffect(() => {
    carregarProjetos();
  }, []);

  async function carregarProjetos() {
    const data = await getProjetos();
    setProjetos(data);
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
    setProjetoEdit(null);
    setForm(FORM_VAZIO);
    setPreview(null);
    setFormAberto(true);
  }

  // Abrir form editar
  async function abrirFormEditar(item) {
    try {
      const data = await getProjetoById(item.id);

      // Detecta o tipo de repositório a partir dos dados retornados
      let tipoRepo = "unico";
      if (data.repositorios) {
        const temFront = data.repositorios.some((r) => r.tipo === "frontend");
        const temBack = data.repositorios.some((r) => r.tipo === "backend");
        if (temFront || temBack) tipoRepo = "separado";
      }

      setForm({
        nome: data.nome ?? "",
        resumo: data.resumo ?? "",
        descricao: data.descricao ?? "",
        link_projeto: data.link_projeto ?? "",
        tecnologias: data.tecnologias
          ? data.tecnologias.map((t) => t.skill).join(", ")
          : "",
        tipoRepo,
        link_unico:
          data.repositorios?.find((r) => r.tipo === "único")?.link ?? "",
        link_backend:
          data.repositorios?.find((r) => r.tipo === "backend")?.link ?? "",
        link_frontend:
          data.repositorios?.find((r) => r.tipo === "frontend")?.link ?? "",
        imagem: null,
      });

      setPreview(data.imagem ?? null);
      setProjetoEdit(data);
      setFormAberto(true);
    } catch {
      mostrarErro("Erro ao carregar projeto.");
    }
  }

  // Fechar form
  function fecharForm() {
    setFormAberto(false);
    setProjetoEdit(null);
    setForm(FORM_VAZIO);
    setPreview(null);
  }

  // Atualizar campo do form
  function setCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  // Upload de imagem
  function handleImagem(file) {
    setForm((prev) => ({ ...prev, imagem: file }));
    setPreview(URL.createObjectURL(file));
  }

  // Montar formData para envio
  function montarFormData() {
    const fd = new FormData();
    fd.append("nome", form.nome);
    fd.append("resumo", form.resumo);
    fd.append("descricao", form.descricao);
    fd.append("tecnologias", form.tecnologias);

    if (form.link_projeto) fd.append("link_projeto", form.link_projeto);
    if (form.link_unico) fd.append("link_unico", form.link_unico);
    if (form.link_backend) fd.append("link_backend", form.link_backend);
    if (form.link_frontend) fd.append("link_frontend", form.link_frontend);
    if (form.imagem) fd.append("imagem", form.imagem);

    return fd;
  }

  // Submit
  async function handleSubmit() {
    setLoading(true);
    try {
      const fd = montarFormData();
      if (projetoEdit) {
        await atualizarProjeto(projetoEdit.id, fd);
        mostrarSucesso("Projeto Atualizado");
      } else {
        await criarProjeto(fd);
        mostrarSucesso("Projeto Adicionado");
      }
      fecharForm();
      carregarProjetos();
    } catch (err) {
      const msg = err.response?.data?.detail ?? "Erro ao salvar projeto.";
      mostrarErro(msg);
    } finally {
      setLoading(false);
    }
  }

  // Deletar
  async function handleDelete(item) {
    try {
      await deletarProjeto(item.id);
      mostrarSucesso("Projeto Removido");
      await carregarProjetos();
    } catch (err) {
      const msg = err.response?.data?.detail ?? "Erro ao remover projeto.";
      mostrarErro(msg);
    }
  }

  // Colunas
  const colunas = [
    { key: "nome", label: "Título", mobile: true },
    { key: "tecnologias", label: "Tecnologias", mobile: false },
    { key: "criado_em", label: "Data", mobile: false },
  ];

  function renderCell(key, value) {
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
    return value ?? "—";
  }

  return (
    <div className="admin-page">
      <Titulo
        titulo="Projetos"
        admin={true}
        textoButton="Novo Projeto"
        onClick={abrirFormNovo}
      />
      <DataTable
        columns={colunas}
        data={projetos}
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
          titulo={projetoEdit ? "Editar Projeto" : "Novo Projeto"}
          onClose={fecharForm}
          onSubmit={handleSubmit}
          loading={loading}
        >
          {/* Preview da imagem */}
          <img
            src={preview ?? "/imagem-nao-encontrada.svg"}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg border border-slate-300 bg-slate-100 col-span-2"
          />

          {/* FileDrop */}
          <FileDrop
            accept="image/*"
            onChange={handleImagem}
            className={"col-span-2"}
          />

          {/* Campos de texto */}
          <Fields
            type="text"
            placeholder="Título"
            value={form.nome}
            onChange={(e) => setCampo("nome", e.target.value)}
            className={"col-span-2"}
            required
          />
          <Fields
            type="text"
            placeholder="Resumo"
            value={form.resumo}
            onChange={(e) => setCampo("resumo", e.target.value)}
            className={"col-span-2"}
            required
          />
          <Fields
            textarea
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setCampo("descricao", e.target.value)}
            className={"col-span-2"}
            required
          />
          <Fields
            type="text"
            placeholder="Tecnologias (separadas por vírgula)"
            value={form.tecnologias}
            onChange={(e) => setCampo("tecnologias", e.target.value)}
            className={"col-span-2"}
            required
          />
          <Fields
            type="text"
            placeholder="URL Live"
            value={form.link_projeto}
            onChange={(e) => setCampo("link_projeto", e.target.value)}
            className={"col-span-2"}
          />

          {/* Tipo de repositório */}
          <div className="flex gap-4 text-sm text-slate-600 col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tipoRepo"
                value="unico"
                checked={form.tipoRepo === "unico"}
                onChange={() => setCampo("tipoRepo", "unico")}
              />
              Repositório Único
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tipoRepo"
                value="separado"
                checked={form.tipoRepo === "separado"}
                onChange={() => setCampo("tipoRepo", "separado")}
              />
              Frontend / Backend separados
            </label>
          </div>

          {/* Campos de repositório condicionais */}
          {form.tipoRepo === "unico" && (
            <Fields
              type="text"
              placeholder="URL Repositório (Único)"
              value={form.link_unico}
              onChange={(e) => setCampo("link_unico", e.target.value)}
              className={"col-span-2"}
            />
          )}
          {form.tipoRepo === "separado" && (
            <>
              <Fields
                type="text"
                placeholder="URL Repositório (Backend)"
                value={form.link_backend}
                onChange={(e) => setCampo("link_backend", e.target.value)}
                className={"col-span-2"}
              />
              <Fields
                type="text"
                placeholder="URL Repositório (Frontend)"
                value={form.link_frontend}
                onChange={(e) => setCampo("link_frontend", e.target.value)}
                className={"col-span-2"}
              />
            </>
          )}
        </Form>
      )}
    </div>
  );
}
