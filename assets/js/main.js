// ====== DATA DE CURSOS (puedes editar libremente) ======
const COURSES = {
  "autocuidado": {
    title: "Autocuidado y salud integral",
    desc: "Promueve prácticas de bienestar físico, mental y social, con énfasis en el desarrollo de herramientas personales de autocuidado.",
    fechas: [
      { id:"a1", place:"Sede Centro",  iso:"2025-12-05T18:00:00-03:00" },
      { id:"a2", place:"Sede Norte",   iso:"2025-12-12T10:00:00-03:00" },
      { id:"a3", place:"Online",       iso:"2026-01-15T19:00:00-03:00" }
    ]
  },
  "estres": {
    title: "Consciencia plena frente a situaciones de estrés",
    desc: "Introduce técnicas de mindfulness para manejar el estrés en contextos cotidianos y de emergencia.",
    fechas: [
      { id:"e1", place:"Sede Centro", iso:"2025-12-07T18:30:00-03:00" },
      { id:"e2", place:"Online",      iso:"2025-12-20T09:00:00-03:00" }
    ]
  },
  "estres-nna": {
    title: "Consciencia plena frente a situaciones de estrés (NNA)",
    desc: "Mindfulness para niñas, niños y adolescentes en contextos cotidianos y de emergencia.",
    fechas: [
      { id:"en1", place:"Escuela A", iso:"2025-12-14T11:00:00-03:00" },
      { id:"en2", place:"Online",    iso:"2026-01-10T17:30:00-03:00" }
    ]
  },
  "emergencias": {
    title: "Respuesta comunitaria frente a emergencias",
    desc: "Fortalece la capacidad de las comunidades para organizarse y responder ante desastres naturales u otras contingencias.",
    fechas: [
      { id:"r1", place:"Sede Sur",  iso:"2025-12-03T18:30:00-03:00" },
      { id:"r2", place:"Online",    iso:"2026-01-08T19:00:00-03:00" }
    ]
  },
  "pap-abcde": {
    title: "Orientaciones en primeros auxilios psicológicos",
    desc: "Brinda herramientas para apoyar emocionalmente a personas en crisis, desde la técnica A-B-C-D-E.",
    fechas: [
      { id:"p1", place:"Sede Centro", iso:"2025-12-18T18:00:00-03:00" },
      { id:"p2", place:"Online",      iso:"2026-01-22T18:30:00-03:00" }
    ]
  },
  "sostenibilidad": {
    title: "Sostenibilidad y economía circular",
    desc: "Promueve prácticas sostenibles con conceptos y ejemplos aplicables a la vida comunitaria y cotidiana.",
    fechas: [
      { id:"s1", place:"Sede Centro", iso:"2025-12-11T18:00:00-03:00" },
      { id:"s2", place:"Online",      iso:"2026-01-17T10:00:00-03:00" }
    ]
  },
  "historias": {
    title: "Historias bordadas",
    desc: "Expresión artística y empoderamiento personal a través del bordado, inspirado en la tradición de las arpilleras chilenas.",
    fechas: [
      { id:"h1", place:"Taller Bellas Artes", iso:"2025-12-09T17:30:00-03:00" },
      { id:"h2", place:"Online",             iso:"2026-01-24T18:30:00-03:00" }
    ]
  }
};

// ====== UTIL ======
const fmtFecha = (iso) => {
  try{
    const dt = new Date(iso);
    return dt.toLocaleString("es-CL", {
      dateStyle:"full",
      timeStyle:"short",
      timeZone: "America/Santiago"
    });
  }catch(e){
    return iso;
  }
};

// ====== MODAL DETALLES ======
const modal = document.getElementById('courseModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc  = document.getElementById('modalDesc');
const ulFechas   = document.getElementById('modalFechas');

const openModal = () => modal.classList.add('show');
const closeModal = () => modal.classList.remove('show');

modal.addEventListener('click', (ev)=>{
  if (ev.target.dataset.close === 'modal') closeModal();
});

// Attach listeners a todos los botones "Ver detalles"
document.querySelectorAll('.ver-detalles').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.closest('.card').dataset.courseId;
    const c = COURSES[id];
    if(!c) return;

    modalTitle.textContent = c.title;
    modalDesc.textContent  = c.desc;

    // Render fechas
    ulFechas.innerHTML = '';
    c.fechas.forEach(f=>{
      const li = document.createElement('li');
      li.className = 'fecha';
      li.innerHTML = `
        <div>
          <div class="badge">${f.place}</div>
          <div>${fmtFecha(f.iso)}</div>
        </div>
        <button class="btn btn-primary" data-insc='${id}::${f.id}'>Inscribirme</button>
      `;
      ulFechas.appendChild(li);
    });

    openModal();
  });
});

// ====== DRAWER (Inscripción) ======
const drawer = document.getElementById('drawer');
const openDrawer  = () => drawer.classList.add('open');
const closeDrawer = () => drawer.classList.remove('open');

document.querySelectorAll('[data-close="drawer"]').forEach(x=>x.addEventListener('click', closeDrawer));
document.querySelectorAll('[data-close="modal"]').forEach(x=>x.addEventListener('click', closeModal));

// Delegación: click en botón "Inscribirme" dentro del modal
ulFechas.addEventListener('click', (ev)=>{
  const btn = ev.target.closest('button[data-insc]');
  if(!btn) return;
  const [cid, fid] = btn.dataset.insc.split('::');
  const curso = COURSES[cid];
  const fecha = curso?.fechas.find(f=>f.id===fid);

  if(curso && fecha){
    document.getElementById('inscCurso').value = curso.title;
    document.getElementById('inscFecha').value = `${fecha.place} — ${fmtFecha(fecha.iso)}`;
    openDrawer();
  }
});

// Envío de formulario (abre correo por mailto:)
document.getElementById('inscForm').addEventListener('submit', (ev)=>{
  ev.preventDefault();

  const curso = document.getElementById('inscCurso').value;
  const fecha = document.getElementById('inscFecha').value;
  const nombre= document.getElementById('inscNombre').value.trim();
  const correo= document.getElementById('inscCorreo').value.trim();
  const fono  = document.getElementById('inscFono').value.trim();
  const inst  = document.getElementById('inscInst').value.trim();
  const msg   = document.getElementById('inscMsg').value.trim();

  const to = "coordinacion@fundacionbelator.cl"; // <- cámbialo si corresponde
  const subject = encodeURIComponent(`Inscripción: ${curso} (${fecha})`);
  const body = encodeURIComponent(
`Curso: ${curso}
Fecha: ${fecha}

Nombre: ${nombre}
Correo: ${correo}
Teléfono: ${fono}
Institución: ${inst}

Comentarios:
${msg}
`
  );

  // Abre el cliente de correo del usuario:
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
  window.location.href = mailto;

  // Cierre visual
  closeDrawer(); closeModal();
  alert("Se abrirá tu correo para enviar la inscripción. Si no se abrió, revisa el bloqueador de ventanas emergentes.");
});
