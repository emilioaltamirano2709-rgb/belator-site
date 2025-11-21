/* ========= Datos de programas =========
   - Edita fechas/lugares/talleres aquí sin tocar el HTML
*/
const PROGRAMAS = {
  bienestar: {
    nombre: "Seguridad del bienestar comunitario",
    img: "assets/img/bienestar.png.png",
    resumen:
      "Promueve el bienestar integral con talleres de autocuidado, manejo del estrés y herramientas para una vida saludable.",
    talleres: [
      {
        titulo: "Autocuidado y salud integral",
        objetivo:
          "Promueve prácticas de bienestar físico, mental y social con énfasis en herramientas personales de autocuidado.",
      },
      {
        titulo: "Consciencia plena frente a situaciones de estrés",
        objetivo:
          "Introduce técnicas de mindfulness para manejar el estrés en contextos cotidianos y de emergencia.",
      },
      {
        titulo: "Consciencia plena frente a situaciones de estrés NNA",
        objetivo:
          "Aplicación de mindfulness para NNA en contextos cotidianos y de emergencia.",
      },
    ],
    fechas: [
      { fecha: "Sáb 30 Nov, 10:00", lugar: "Sede Vecinal René Schneider" },
      { fecha: "Mié 04 Dic, 18:30", lugar: "Centro Comunitario La Esperanza" },
    ],
  },

  empoderamiento: {
    nombre: "Seguridad del empoderamiento comunitario",
    img: "assets/img/empoderamiento.png.png",
    resumen:
      "Fortalece capacidades para la participación activa, organización social y liderazgo comunitario.",
    talleres: [
      {
        titulo: "Respuesta comunitaria frente a emergencias",
        objetivo:
          "Desarrolla la capacidad de organizarse y responder ante desastres naturales u otras contingencias.",
      },
      {
        titulo: "Orientaciones en primeros auxilios psicológicos",
        objetivo:
          "Herramientas para apoyo emocional en crisis (técnica A-B-C-D-E de la PUC).",
      },
    ],
    fechas: [
      { fecha: "Jue 05 Dic, 19:00", lugar: "Junta de Vecinos Vista al Mar" },
      { fecha: "Sáb 14 Dic, 11:00", lugar: "Colegio San Agustín (Gimnasio)" },
    ],
  },

  medioambiental: {
    nombre: "Seguridad medioambiental",
    img: "assets/img/medioambiental.png.png",
    resumen:
      "Educación ambiental, prácticas responsables y economía circular para fortalecer la conciencia ecológica.",
    talleres: [
      {
        titulo: "Sostenibilidad y economía circular",
        objetivo:
          "Promueve prácticas sostenibles con conceptos y ejemplos aplicables a la vida comunitaria y cotidiana.",
      },
    ],
    fechas: [
      { fecha: "Vie 29 Nov, 17:30", lugar: "Biblioteca Municipal" },
      { fecha: "Mié 11 Dic, 18:00", lugar: "Parque Comunal (Sala multiuso)" },
    ],
  },

  arteterapia: {
    nombre: "Programa especial: Arteterapia (Historias bordadas)",
    img: "assets/img/arteterapia.png.png",
    resumen:
      "Expresión y empoderamiento personal a través del bordado e historias bordadas.",
    talleres: [
      {
        titulo: "Historias bordadas",
        objetivo:
          "5 sesiones (1.5h c/u) para desarrollar arpilleras personales, explorando historia, identidad y trabajo colectivo.",
      },
    ],
    fechas: [
      { fecha: "Mar 03 Dic, 18:30", lugar: "Casa de la Cultura" },
      { fecha: "Mar 10 Dic, 18:30", lugar: "Casa de la Cultura" },
    ],
  },
};

/* ========= Utilidades DOM ========= */
const $  = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

/* ========= Modal Detalles ========= */
const modal    = $("#detalleModal");
const mImg     = $("#detalleImg");
const mTitulo  = $("#detalleTitulo");
const mResumen = $("#detalleResumen");
const mTalleres= $("#detalleTalleres");
const mFechas  = $("#detalleFechas");

function openModal(){ modal.setAttribute("aria-hidden","false"); }
function closeModal(){ modal.setAttribute("aria-hidden","true"); }
modal.addEventListener("click", e => { if (e.target.dataset.close) closeModal(); });

/* Rellena modal con info del programa */
function showDetalles(key){
  const p = PROGRAMAS[key];
  if(!p) return;

  mImg.src = p.img;
  mImg.alt = p.nombre;
  mTitulo.textContent = p.nombre;
  mResumen.textContent = p.resumen;

  // talleres
  mTalleres.innerHTML = "";
  p.talleres.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${t.titulo}:</strong> ${t.objetivo}`;
    mTalleres.appendChild(li);
  });

  // fechas
  mFechas.innerHTML = "";
  p.fechas.forEach(f => {
    const row = document.createElement("div");
    row.className = "fecha";
    row.innerHTML = `
      <div>
        <div class="meta">${f.fecha}</div>
        <div class="place">${f.lugar}</div>
      </div>
      <button class="btn btn-primary" data-insc="${key}" data-fecha="${f.fecha}" data-lugar="${f.lugar}">
        Inscribirme
      </button>
    `;
    mFechas.appendChild(row);
  });

  openModal();
}

/* Botones "Ver detalles" */
$$(".card .btn").forEach(btn=>{
  btn.addEventListener("click", e => {
    const key = e.currentTarget.dataset.programa;
    showDetalles(key);
  });
});

/* ========= Drawer de Inscripción ========= */
const drawer = $("#inscripcion");
const inscPrograma = $("#inscPrograma");
const inscFecha = $("#inscFecha");
const inscResumen = $("#inscResumen");

function openDrawer(){ drawer.setAttribute("aria-hidden","false"); }
function closeDrawer(){ drawer.setAttribute("aria-hidden","true"); }

drawer.addEventListener("click", e => {
  if (e.target.dataset.drawerClose) closeDrawer();
});

/* Delegación: click en "Inscribirme" dentro del modal */
mFechas.addEventListener("click", e=>{
  const btn = e.target.closest("button[data-insc]");
  if(!btn) return;
  const key   = btn.dataset.insc;
  const fecha = btn.dataset.fecha;
  const lugar = btn.dataset.lugar;
  const p     = PROGRAMAS[key];

  inscPrograma.value = p.nombre;
  inscFecha.value    = `${fecha} — ${lugar}`;
  inscResumen.textContent = `${p.nombre} · ${fecha} · ${lugar}`;

  openDrawer();
});

/* ========= Envío: mailto pre-llenado =========
   Cambia el correo del coordinador aquí:
*/
const COORDINADOR_EMAIL = "coordinacion@fundacionbelator.cl";

$("#formInsc").addEventListener("submit", (e)=>{
  e.preventDefault();

  const nombre = $("#inscNombre").value.trim();
  const email  = $("#inscEmail").value.trim();
  const fono   = $("#inscFono").value.trim();
  const inst   = $("#inscInst").value.trim();
  const msg    = $("#inscMsg").value.trim();
  const prog   = inscPrograma.value;
  const fecha  = inscFecha.value;

  // Construimos correo
  const subject = encodeURIComponent(`Inscripción · ${prog} · ${nombre}`);
  const body = encodeURIComponent(
`Hola equipo Belator,

Deseo inscribirme en:
• Programa: ${prog}
• Fecha/lugar: ${fecha}

Mis datos:
• Nombre: ${nombre}
• Correo: ${email}
• Teléfono: ${fono || "-"}
• Institución: ${inst || "-"}

Mensaje adicional:
${msg || "-"}
`);

  window.location.href = `mailto:${COORDINADOR_EMAIL}?subject=${subject}&body=${body}`;

  // cierres de UI
  closeDrawer();
  closeModal();
});
