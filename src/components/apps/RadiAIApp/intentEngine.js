import { profile } from '../../../config/profile';
import { projects } from '../../../config/projects';
import { skills } from '../../../config/skills';
import { timeline } from '../../../config/timeline';

/**
 * Rule-based offline intent engine for RADI AI.
 * Responds strictly based on verified data from src/config/.
 */

export function processUserQuery(rawInput) {
  const query = (rawInput || '').toLowerCase().trim();

  if (!query) {
    return 'Please enter a question or select one of the suggested prompts below.';
  }

  // 1. GREETINGS
  if (/^(hi|hello|hey|salam|salut|bonjour|greetings|start|yo)(\s+|$|[!?.,])/i.test(query)) {
    return `Hello! I am RADI AI, the built-in offline assistant for DEV.OS. I can answer questions about Marouane's projects, technical stack, academic background at ISTA Ouarzazate, verified certifications, or contact channels. What would you like to know?`;
  }

  // 2. IDENTITY / WHO IS HE
  if (
    /who (is|are) (he|marouane|you)|tell me about (him|marouane|yourself)|bio|about/i.test(query)
  ) {
    return `${profile.name} is a ${profile.title} based in ${profile.location}.\n\n"${profile.summary}"\n\nHe is currently completing his Bac+2 in Digital Web Full Stack Development at ISTA Ouarzazate (2024–2026).`;
  }

  // 3. STRONGEST / BEST / FAVORITE PROJECT
  if (
    /strongest|best|flagship|favorite|top project|main project|highlight/i.test(query)
  ) {
    const ormvao = projects.find((p) => p.id === 'ecommerce-cooperatives');
    const pvArchive = projects.find((p) => p.id === 'pv-archive');

    return `Marouane's flagship project is the "${ormvao.name}" developed for ${ormvao.organization} (${ormvao.period}).\n\n` +
      `• Stack: ${ormvao.stack.join(', ')}\n` +
      `• Problem Solved: ${ormvao.problem}\n` +
      `• Architecture: ${ormvao.architecture}\n\n` +
      `Another notable high-stakes enterprise project is the "${pvArchive.name}" at ${pvArchive.organization}, which digitizes and secures official examination records and minutes.`;
  }

  // 4. ALL PROJECTS / WHAT HAS HE BUILT
  if (
    /project|built|portfolio|work|github repos|applications/i.test(query)
  ) {
    const list = projects
      .map((p, idx) => `${idx + 1}. ${p.name} (${p.organization || 'Personal'})\n   Stack: ${p.stack.join(', ')}\n   Summary: ${p.tagline}`)
      .join('\n\n');

    return `Here are the projects built by Marouane Radi:\n\n${list}\n\nYou can open the "Projects" app (projects.app) for complete architecture blueprints and source code links.`;
  }

  // 5. SKILLS / TECH STACK / TECHNOLOGIES
  if (
    /technolog|skill|stack|languages|frameworks|tools|database|backend|frontend/i.test(query)
  ) {
    const frontend = skills.filter((s) => s.category === 'Frontend').map((s) => s.name).join(', ');
    const backend = skills.filter((s) => s.category === 'Backend').map((s) => s.name).join(', ');
    const database = skills.filter((s) => s.category === 'Database').map((s) => s.name).join(', ');
    const tools = skills.filter((s) => s.category === 'Tools').map((s) => s.name).join(', ');

    return `Marouane's technical stack spans:\n\n` +
      `• Frontend: ${frontend}\n` +
      `• Backend: ${backend}\n` +
      `• Databases: ${database}\n` +
      `• Tools & DevOps: ${tools}\n\n` +
      `He specializes in full stack applications connecting Laravel REST backends with responsive React frontends.`;
  }

  // 6. EDUCATION / STUDIES / DIPLOMA
  if (
    /education|study|studies|diploma|degree|school|university|ista|bac/i.test(query)
  ) {
    return `Academic Background:\n\n` +
      `• 2024–2026: ${profile.education}\n` +
      `• 2023: Baccalauréat Sciences Physiques (option Français) — Lycée Abou El Kacem, Skoura\n\n` +
      `His training at ISTA Ouarzazate focuses on web architectures, relational database modeling, enterprise PHP/Laravel, and modern React SPAs.`;
  }

  // 7. CERTIFICATIONS
  if (
    /certif|accredit|credentials|badges/i.test(query)
  ) {
    const certsList = profile.certifications
      .map((c, i) => `${i + 1}. ${c.name || c}`)
      .join('\n');

    return `Marouane holds ${profile.certifications.length} verified certifications:\n\n${certsList}\n\nYou can inspect these verified badges inside the "About Me" (about.sys) application.`;
  }

  // 8. CONTACT / REACH HIM
  if (
    /contact|email|phone|call|reach|message|linkedin|hire/i.test(query)
  ) {
    return `You can reach Marouane Radi through:\n\n` +
      `• Email: ${profile.email}\n` +
      `• Phone: ${profile.phone}\n` +
      `• LinkedIn: ${profile.linkedin}\n` +
      `• GitHub: ${profile.github}\n` +
      `• Location: ${profile.location} (GMT+1)\n\n` +
      `You can also use the built-in "contact.msg" app to send a direct transmission.`;
  }

  // 9. HONEST FALLBACK (NO HALLUCINATION)
  return `I don't have verified information about "${rawInput.trim()}" in the system records.

Try asking about:
• "What is his strongest project?"
• "What technologies does he use?"
• "Where did he study?"
• "What certifications does he hold?"
• "How can I contact him?"`;
}
