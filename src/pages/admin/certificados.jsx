import Titulo from "../../components/titulo";
import DataTable from "../../components/datatable";
import Skill from "../../components/skill";
import ToastNotification from "../../components/toastNotification";
import Form from "../../components/form";
import Fields from "../../components/fields";

import { useState, useEffect } from "react";
import {
  getCertificados,
  getCertificadoById,
  criarCertificado,
  atualizarCertificado,
  deletarCertificado,
} from "../../services/certificadosService";

const FORM_VAZIO = {
  nome: "",
  instituicao: "",
  carga_horaria: "",
  link: "",
  dt_conclusao: "",
  tecnologias: "",
};

export default function CertificadosAdmin() {
  const [certificados, setCertificados] = useState([]);
  const [toast, setToast] = useState(null);
  const [formAberto, setFormAberto] = useState(false);
  const [certificadoEdit, setCertificadoEdit] = useState(null);
  const [form, setForm] = useState(FORM_VAZIO);
  const [loading, setLoading] = useState(false);

  // Carregar certificados
  useEffect(() => {
    carregarCertificados();
  }, []);

  async function carregarCertificados() {
    const data = await getCertificados();
    setCertificados(data);
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
    setCertificadoEdit(null);
    setForm(FORM_VAZIO);
    setFormAberto(true);
  }

  // Abrir form editar
  async function abrirFormEditar(item) {
    try {
      const data = await getCertificadoById(item.id);
      setForm({
        nome: data.nome ?? "",
        instituicao: data.instituicao ?? "",
        carga_horaria: data.carga_horaria ?? "",
        link: data.link ?? "",
        dt_conclusao: data.dt_conclusao ?? "",
        tecnologias: data.tecnologias
          ? data.tecnologias.map((t) => t.skill).join(", ")
          : "",
      });
      setCertificadoEdit(data);
      setFormAberto(true);
    } catch {
      mostrarErro("Erro ao carregar certificado.");
    }
  }

  // Fechar form
  function fecharForm() {
    setFormAberto(false);
    setCertificadoEdit(null);
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
        nome: form.nome,
        instituicao: form.instituicao,
        carga_horaria: Number(form.carga_horaria),
        link: form.link,
        dt_conclusao: form.dt_conclusao,
        tecnologias: form.tecnologias,
      };

      if (certificadoEdit) {
        await atualizarCertificado(certificadoEdit.id, payload);
        mostrarSucesso("Certificado Atualizado");
      } else {
        await criarCertificado(payload);
        mostrarSucesso("Certificado Adicionado");
      }
      fecharForm();
      carregarCertificados();
    } catch (err) {
      const msg = err.response?.data?.detail ?? "Erro ao salvar certificado.";
      mostrarErro(msg);
    } finally {
      setLoading(false);
    }
  }

  // Deletar
  async function handleDelete(item) {
    try {
      await deletarCertificado(item.id);
      mostrarSucesso("Certificado Removido");
      carregarCertificados();
    } catch (err) {
      const msg = err.response?.data?.detail ?? "Erro ao remover certificado.";
      mostrarErro(msg);
    }
  }

  // Colunas
  const colunas = [
    { key: "nome", label: "Título", mobile: true },
    { key: "instituicao", label: "Instituição", mobile: false },
    { key: "tecnologias", label: "Tecnologias", mobile: false },
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
        titulo="Certificados"
        admin={true}
        textoButton="Novo Certificado"
        onClick={abrirFormNovo}
      />
      <DataTable
        columns={colunas}
        data={certificados}
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
          titulo={certificadoEdit ? "Editar Certificado" : "Novo Certificado"}
          onClose={fecharForm}
          onSubmit={handleSubmit}
          loading={loading}
        >
          {/* Nome */}
          <Fields
            type="text"
            placeholder="Nome do certificado"
            value={form.nome}
            onChange={(e) => setCampo("nome", e.target.value)}
            className="col-span-2"
            required={true}
          />

          {/* Instituição  */}
          <Fields
            type="text"
            placeholder="Instituição"
            value={form.instituicao}
            onChange={(e) => setCampo("instituicao", e.target.value)}
            className="col-span-2"
            required={true}
          />

          {/* Carga horária */}
          <Fields
            type="number"
            placeholder="Carga horária (h)"
            value={form.carga_horaria}
            onChange={(e) => setCampo("carga_horaria", e.target.value)}
            className="col-span-2"
          />

          {/* Link */}
          <Fields
            type="text"
            placeholder="Link do certificado"
            value={form.link}
            onChange={(e) => setCampo("link", e.target.value)}
            className="col-span-2"
            required={true}
          />

          {/* Data de conclusão */}
          <Fields
            type="date"
            placeholder="Data de conclusão"
            value={form.dt_conclusao}
            onChange={(e) => setCampo("dt_conclusao", e.target.value)}
            className="col-span-2"
            required={true}
          />

          {/* Tecnologias */}
          <Fields
            type="text"
            placeholder="Tecnologias (separadas por vírgula)"
            value={form.tecnologias}
            onChange={(e) => setCampo("tecnologias", e.target.value)}
            className="col-span-2"
            required={true}
          />
        </Form>
      )}
    </div>
  );
}
