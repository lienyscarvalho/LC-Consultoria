/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import GastroMetricsDemo from './components/GastroMetricsDemo';
import AIChat from './components/AIChat';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLead = (e: FormEvent) => {
    e.preventDefault();
    alert('✅ Planilha enviada para seu e-mail! Verifique sua caixa de entrada.');
    (e.target as HTMLFormElement).reset();
  };

  const handleContact = (e: FormEvent) => {
    e.preventDefault();
    alert('✅ Mensagem enviada! Nossa equipe entrará em contato em até 24h.');
    (e.target as HTMLFormElement).reset();
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#home" className="logo">LC<span> Consultoria</span></a>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} id="navLinks">
          <li><a href="#sobre" onClick={handleLinkClick}>Sobre</a></li>
          <li><a href="#servicos" onClick={handleLinkClick}>Serviços</a></li>
          <li><a href="#gastrometrics" onClick={handleLinkClick}>GastroMetrics</a></li>
          <li><a href="#critica" onClick={handleLinkClick}>Crítica</a></li>
          <li><a href="#planos" onClick={handleLinkClick}>Planos</a></li>
          <li><a href="#contato" className="nav-cta" onClick={handleLinkClick}>Contato</a></li>
        </ul>
        <div className="hamburger" id="hamburger" onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      {/* HERO */}
      <section id="home">
        <img 
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1920" 
          alt="Gastronomia Profissional" 
          className="hero-bg-image"
          referrerPolicy="no-referrer"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">Consultoria & Crítica Gastronômica</div>
          <h1 className="hero-title">
            Transforme seu restaurante em um <em>negócio lucrativo</em>
          </h1>
          <p className="hero-sub">
            A LC Consultoria une expertise gastronômica, gestão financeira baseada em dados e crítica especializada para elevar negócios do setor a outro nível de eficiência e rentabilidade.
          </p>
          <div className="hero-buttons">
            <a href="#contato" className="btn-primary">Agendar diagnóstico gratuito →</a>
            <a href="#servicos" className="btn-outline">Conhecer serviços</a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">+200</div>
              <div className="stat-label">Negócios atendidos</div>
            </div>
            <div className="stat">
              <div className="stat-num">30%</div>
              <div className="stat-label">Redução média de CMV</div>
            </div>
            <div className="stat">
              <div className="stat-num">15+</div>
              <div className="stat-label">Anos de experiência</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre">
        <div className="about-visual reveal">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" 
            alt="Chef Profissional" 
            className="w-full h-[300px] object-cover rounded-lg shadow-2xl mb-8"
            referrerPolicy="no-referrer"
          />
          <div className="about-card">
            <p>"Você sente que trabalha muito, mas o dinheiro some no fim do mês? O segredo está no seu CMV oculto — e nós sabemos como encontrá-lo."</p>
            <cite>— LC Consultoria Gastronômica</cite>
            <div className="about-accent"></div>
          </div>
        </div>
        <div className="about-text reveal">
          <span className="section-tag">Quem somos</span>
          <h2 className="section-title">Autoridade técnica a serviço da gastronomia</h2>
          <p>A LC Consultoria e Crítica Gastronômica nasce da convergência entre paixão pela gastronomia e rigor técnico em gestão de negócios. Atuamos como parceiros estratégicos de restaurantes, bares, padarias e negócios alimentares que desejam profissionalizar sua operação.</p>
          <p>Combinamos consultoria de gestão financeira, engenharia de cardápio, crítica gastronômica especializada e tecnologia com o GastroMetrics — nossa plataforma proprietária de gestão baseada em dados.</p>
          <div className="about-highlights">
            <div className="highlight-item">
              <strong>Engenharia de Cardápio</strong>
              <span>Ficha técnica profissional e markup preciso</span>
            </div>
            <div className="highlight-item">
              <strong>Gestão Financeira</strong>
              <span>CMV real, DRE gerencial e break-even</span>
            </div>
            <div className="highlight-item">
              <strong>Crítica Especializada</strong>
              <span>Avaliação técnica para qualidade e posicionamento</span>
            </div>
            <div className="highlight-item">
              <strong>Tecnologia GastroMetrics</strong>
              <span>Dashboards de BI integrados ao seu negócio</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos">
        <div className="text-center reveal">
          <span className="section-tag">Nossos Serviços</span>
          <h2 className="section-title">Soluções completas para seu negócio gastronômico</h2>
          <p className="section-sub">Do diagnóstico à implementação, acompanhamos cada etapa da transformação do seu restaurante em uma operação eficiente e lucrativa.</p>
        </div>
        <div className="services-grid">
          <div className="service-card reveal">
            <div className="service-icon">📊</div>
            <h3>Diagnóstico Financeiro</h3>
            <p>Análise completa do CMV real, identificação de desperdícios ocultos, mapeamento de custos fixos e variáveis, e DRE gerencial personalizado para o seu negócio.</p>
            <span className="service-price">→ Sessão única ou mensal</span>
          </div>
          <div className="service-card reveal">
            <div className="service-icon">📋</div>
            <h3>Engenharia de Cardápio</h3>
            <p>Elaboração de Fichas Técnicas Profissionais (FTP) com cálculo de Fator de Correção, Fator de Cocção, precificação via Markup e análise de rentabilidade por prato.</p>
            <span className="service-price">→ Por cardápio completo</span>
          </div>
          <div className="service-card reveal">
            <div className="service-icon">💰</div>
            <h3>Formação de Preços</h3>
            <p>Calculamos o Markup ideal considerando suas despesas fixas, variáveis e margem de lucro desejada. Elimine o "achismo" e precifique com segurança e competitividade.</p>
            <span className="service-price">→ Por cardápio ou avulso</span>
          </div>
          <div className="service-card reveal">
            <div className="service-icon">📦</div>
            <h3>Gestão de Estoque</h3>
            <p>Implantação do inventário permanente com curva ABC, controle de validades, alertas de estoque baixo e integração com ficha técnica para cálculo automático de CMV.</p>
            <span className="service-price">→ Consultoria + implantação</span>
          </div>
          <div className="service-card reveal">
            <div className="service-icon">👥</div>
            <h3>Gestão de Equipe</h3>
            <p>Gerador de escalas 5x1, 6x1 e 12x36 conforme legislação trabalhista, controle de folgas obrigatórias e dimensionamento ideal de equipe por volume de vendas.</p>
            <span className="service-price">→ Consultoria mensal</span>
          </div>
          <div className="service-card reveal">
            <div className="service-icon">🎯</div>
            <h3>Treinamento Gerencial</h3>
            <p>Capacitação presencial ou online para donos e gerentes: leitura de indicadores, tomada de decisão baseada em dados, gestão de custos e padronização de processos.</p>
            <span className="service-price">→ Turmas ou in company</span>
          </div>
        </div>
      </section>

      {/* GASTROMETRICS */}
      <section id="gastrometrics">
        <div className="gm-grid">
          <div className="reveal">
            <span className="section-tag">Tecnologia Proprietária</span>
            <h2 className="section-title">GastroMetrics — Gestão Baseada em Dados</h2>
            <p className="section-sub" style={{color: 'rgba(255,255,255,0.65)'}}>Nossa plataforma transforma o custo da matéria-prima em inteligência de negócio, com dashboards em tempo real para decisões estratégicas.</p>
            <div className="gm-features">
              <div className="gm-feature">
                <div className="gm-feature-icon">📈</div>
                <div>
                  <h4>Dashboard Financeiro em Tempo Real</h4>
                  <p>DRE gerencial automatizado com CMV real (Estoque Inicial + Compras – Estoque Final), alertas de meta e comparativo mensal de crescimento.</p>
                </div>
              </div>
              <div className="gm-feature">
                <div className="gm-feature-icon">🍽️</div>
                <div>
                  <h4>Ficha Técnica Digital Inteligente</h4>
                  <p>FC e FCy calculados automaticamente. Upload de foto do prato para padronização de equipe. Vinculado ao estoque em tempo real.</p>
                </div>
              </div>
              <div className="gm-feature">
                <div className="gm-feature-icon">⚡</div>
                <div>
                  <h4>KPIs e NPS Integrados</h4>
                  <p>Ticket médio, ponto de equilíbrio, velocidade de crescimento e monitoramento de satisfação de clientes numa única tela.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal w-full">
            <GastroMetricsDemo />
          </div>
        </div>
      </section>

      {/* METODOLOGIA */}
      <section id="metodologia">
        <div className="text-center reveal">
          <span className="section-tag">Como Trabalhamos</span>
          <h2 className="section-title">Metodologia de implementação em 5 etapas</h2>
          <p className="section-sub">Um processo estruturado que garante resultados mensuráveis desde o primeiro mês de parceria.</p>
        </div>
        <div className="steps reveal">
          <div className="step">
            <div className="step-num">01</div>
            <h4>Setup de Dados</h4>
            <p>Levantamento completo: insumos, fornecedores, cardápio atual e histórico financeiro.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h4>Fichas Técnicas</h4>
            <p>Elaboração das FTPs com FC, FCy e custo real de cada prato do cardápio.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h4>Financeiro</h4>
            <p>Cálculo de Markup, Break-even e projeções de lucro com cenários alternativos.</p>
          </div>
          <div className="step">
            <div className="step-num">04</div>
            <h4>Dashboards BI</h4>
            <p>Ativação do GastroMetrics com KPIs personalizados e alertas automáticos.</p>
          </div>
          <div className="step">
            <div className="step-num">05</div>
            <h4>Go-to-Market</h4>
            <p>Revisão de cardápio, estratégia de precificação e plano de crescimento sustentável.</p>
          </div>
        </div>
      </section>

      {/* CRÍTICA GASTRONÔMICA */}
      <section id="critica">
        <div className="critica-grid">
          <div className="reveal">
            <div className="critica-card">
              <div className="stars">★★★★★</div>
              <p className="critica-quote">"A análise da LC foi cirúrgica. Em dois meses, reformulamos o cardápio, ajustamos os preços e nossa margem saltou de 8% para 22%. Eles enxergam o que a gente não consegue ver no dia a dia."</p>
              <div className="critica-meta">
                <div className="critica-avatar">M</div>
                <div>
                  <strong>Marcos Tavares</strong>
                  <span>Proprietário — Restaurante Marés, São Paulo</span>
                </div>
              </div>
            </div>
            <div className="critica-card" style={{marginTop: '1.5rem'}}>
              <div className="stars">★★★★★</div>
              <p className="critica-quote">"A crítica técnica que recebemos foi transformadora. Não foi só elogio ou reclamação — foi um diagnóstico real que nos deu um roteiro de melhoria claro e acionável."</p>
              <div className="critica-meta">
                <div className="critica-avatar">A</div>
                <div>
                  <strong>Ana Beatriz Lima</strong>
                  <span>Chef-proprietária — Bistrô Colheita, BH</span>
                </div>
              </div>
            </div>
          </div>
          <div className="critica-info reveal">
            <span className="section-tag">Crítica Gastronômica</span>
            <h2 className="section-title">Avaliação técnica que transforma negócios</h2>
            <p>Nosso serviço de crítica gastronômica vai além da opinião subjetiva. Utilizamos metodologia estruturada para avaliar cada dimensão do seu estabelecimento com um olhar técnico e construtivo.</p>
            <ul className="critica-list">
              <li>Avaliação sensorial de pratos (sabor, textura, temperatura, apresentação)</li>
              <li>Análise de compatibilidade custo-benefício do cardápio</li>
              <li>Experiência do cliente: atendimento, ambiente e tempo de serviço</li>
              <li>Posicionamento de marca e coerência gastronômica</li>
              <li>Relatório técnico detalhado com plano de melhoria</li>
              <li>Acompanhamento pós-avaliação para implementação</li>
            </ul>
            <a href="#contato" className="btn-primary" style={{marginTop: '2rem', display: 'inline-flex'}}>Solicitar avaliação →</a>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos">
        <div className="text-center reveal">
          <span className="section-tag">Planos e Investimento</span>
          <h2 className="section-title">Escolha o plano ideal para seu negócio</h2>
          <p className="section-sub">Planos flexíveis para restaurantes em diferentes estágios. Todos incluem acesso à plataforma GastroMetrics.</p>
        </div>
        <div className="plans-grid reveal">
          <div className="plan-card">
            <div className="plan-name">Starter</div>
            <div className="plan-price">R$890</div>
            <div className="plan-period">/mês · até 30 pratos</div>
            <ul className="plan-features">
              <li>Diagnóstico financeiro inicial</li>
              <li>Até 30 fichas técnicas (FTP)</li>
              <li>Cálculo de Markup e CMV</li>
              <li>Dashboard básico GastroMetrics</li>
              <li>2 consultorias mensais por vídeo</li>
              <li>Suporte via WhatsApp</li>
            </ul>
            <a href="#contato" className="plan-btn">Começar agora</a>
          </div>
          <div className="plan-card featured">
            <div className="plan-badge">Mais popular</div>
            <div className="plan-name">Profissional</div>
            <div className="plan-price">R$1.890</div>
            <div className="plan-period">/mês · até 80 pratos</div>
            <ul className="plan-features">
              <li>Tudo do Starter, mais:</li>
              <li>Até 80 fichas técnicas + bebidas</li>
              <li>Gestão de estoque com Curva ABC</li>
              <li>DRE gerencial mensal completo</li>
              <li>Dashboards avançados de KPI e NPS</li>
              <li>4 consultorias mensais (pres. ou online)</li>
              <li>Crítica gastronômica trimestral</li>
              <li>Escala de equipe automatizada</li>
            </ul>
            <a href="#contato" className="plan-btn">Escolher Profissional</a>
          </div>
          <div className="plan-card">
            <div className="plan-name">Enterprise</div>
            <div className="plan-price">Sob consulta</div>
            <div className="plan-period">Redes e multi-unidades</div>
            <ul className="plan-features">
              <li>Tudo do Profissional, mais:</li>
              <li>Cardápio ilimitado de pratos</li>
              <li>Integração com PDV e ponto eletrônico</li>
              <li>Gestor dedicado exclusivo</li>
              <li>BI personalizado por unidade</li>
              <li>Consultoria presencial semanal</li>
              <li>Treinamento de equipe in company</li>
              <li>SLA de suporte prioritário</li>
            </ul>
            <a href="#contato" className="plan-btn">Falar com especialista</a>
          </div>
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section id="planilha">
        <h2>🎁 Planilha de Fluxo de Caixa Diário — Grátis</h2>
        <p>Baixe nossa planilha profissional usada por mais de 500 restaurantes para controlar entradas e saídas diariamente. Sem complicação, sem fórmulas complicadas.</p>
        <form className="lead-form" onSubmit={handleLead}>
          <input type="email" placeholder="Seu melhor e-mail" required />
          <button type="submit">Quero a planilha grátis</button>
        </form>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos">
        <div className="text-center reveal">
          <span className="section-tag">Depoimentos</span>
          <h2 className="section-title">Resultados reais de quem confiou na LC</h2>
        </div>
        <div className="testimonials-grid reveal">
          <div className="testimonial-card">
            <div className="t-stars">★★★★★</div>
            <p className="t-text">"Em 3 meses, nosso CMV caiu de 54% para 29%. Descobrimos que estávamos perdendo R$8.000/mês em desperdício que nem sabíamos que existia."</p>
            <div className="t-author">
              <div className="t-avatar">R</div>
              <div>
                <strong>Roberto Caiçara</strong>
                <span>Hamburgueria Caiçara, Santos - SP</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="t-stars">★★★★★</div>
            <p className="t-text">"O GastroMetrics é o que faltava. Hoje tomo todas as decisões de cardápio com dados, não com feeling. Meu ticket médio subiu 34% em 4 meses."</p>
            <div className="t-author">
              <div className="t-avatar">P</div>
              <div>
                <strong>Patrícia Mendes</strong>
                <span>Restaurante Boa Mesa, Florianópolis</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="t-stars">★★★★★</div>
            <p className="t-text">"A crítica gastronômica nos deu um olhar externo essencial. Identificamos inconsistências no cardápio que jamais teríamos visto sozinhos. Recomendo sem hesitar."</p>
            <div className="t-author">
              <div className="t-avatar">F</div>
              <div>
                <strong>Felipe Arruda</strong>
                <span>Chef & Sócio — Osteria Rossa, Curitiba</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato">
        <div className="contact-info reveal">
          <span className="section-tag">Fale Conosco</span>
          <h2 className="section-title">Inicie sua transformação hoje</h2>
          <p>Agende um diagnóstico gratuito de 30 minutos. Analisaremos os principais indicadores do seu negócio e apresentaremos um plano de ação personalizado, sem compromisso.</p>
          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div>
                <strong>WhatsApp</strong>
                <span>(21) 98482-1444</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <strong>E-mail</strong>
                <span>lcconsultoria@lienyscarvalho.com.br</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <strong>Atendimento</strong>
                <span>Presencial (RJ e Niterói/RJ) e Online (todo Brasil)</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🕐</div>
              <div>
                <strong>Horário</strong>
                <span>Seg–Sex: 9h–18h | Sáb: 9h–13h</span>
              </div>
            </div>
          </div>
        </div>
        <div className="reveal">
          <form className="contact-form" onSubmit={handleContact}>
            <div className="form-row">
              <div className="form-group">
                <label>Nome completo *</label>
                <input type="text" placeholder="Seu nome" required />
              </div>
              <div className="form-group">
                <label>WhatsApp *</label>
                <input type="tel" placeholder="(21) 98482-1444" required />
              </div>
            </div>
            <div className="form-group">
              <label>E-mail *</label>
              <input type="email" placeholder="seu@email.com" required />
            </div>
            <div className="form-group">
              <label>Tipo de estabelecimento *</label>
              <select required defaultValue="">
                <option value="" disabled>Selecione...</option>
                <option>Restaurante</option>
                <option>Bar e Boteco</option>
                <option>Hamburgueria</option>
                <option>Pizzaria</option>
                <option>Padaria & Confeitaria</option>
                <option>Food Truck</option>
                <option>Dark Kitchen</option>
                <option>Rede / Franquia</option>
                <option>Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Serviço de interesse</label>
              <select defaultValue="">
                <option value="" disabled>Selecione...</option>
                <option>Diagnóstico Financeiro</option>
                <option>Engenharia de Cardápio</option>
                <option>Plataforma GastroMetrics</option>
                <option>Crítica Gastronômica</option>
                <option>Consultoria Completa</option>
                <option>Não sei ainda</option>
              </select>
            </div>
            <div className="form-group">
              <label>Mensagem</label>
              <textarea placeholder="Conte um pouco sobre seu negócio e seu principal desafio hoje..."></textarea>
            </div>
            <button type="submit" className="form-submit">Solicitar diagnóstico gratuito →</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="logo">LC<span> Consultoria</span></a>
            <p>Transformando negócios gastronômicos com dados, estratégia e expertise. De restaurantes independentes a redes, levamos sua operação ao próximo nível.</p>
          </div>
          <div className="footer-col">
            <h5>Serviços</h5>
            <ul>
              <li><a href="#servicos">Diagnóstico Financeiro</a></li>
              <li><a href="#servicos">Engenharia de Cardápio</a></li>
              <li><a href="#servicos">Formação de Preços</a></li>
              <li><a href="#servicos">Gestão de Estoque</a></li>
              <li><a href="#critica">Crítica Gastronômica</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Plataforma</h5>
            <ul>
              <li><a href="#gastrometrics">GastroMetrics</a></li>
              <li><a href="#gastrometrics">Dashboard Financeiro</a></li>
              <li><a href="#gastrometrics">Fichas Técnicas</a></li>
              <li><a href="#gastrometrics">KPIs e BI</a></li>
              <li><a href="#planilha">Planilha Grátis</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Empresa</h5>
            <ul>
              <li><a href="#sobre">Sobre nós</a></li>
              <li><a href="#metodologia">Metodologia</a></li>
              <li><a href="#planos">Planos</a></li>
              <li><a href="#depoimentos">Depoimentos</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 LC Consultoria e Crítica Gastronômica. Todos os direitos reservados.</span>
          <span>CNPJ: 00.000.000/0001-00 · Rio de Janeiro, RJ</span>
        </div>
      </footer>

      {/* SCROLL TO TOP */}
      <a 
        href="#home" 
        className={`scroll-indicator ${showScrollTop ? 'visible' : ''}`} 
        id="scrollTop"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        ↑
      </a>

      <AIChat />
    </>
  );
}
