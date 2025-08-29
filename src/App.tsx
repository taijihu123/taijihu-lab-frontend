import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [revealedElements, setRevealedElements] = useState<Set<number>>(new Set());

  // 滚动显示动画
  useEffect(() => {
    const handleScroll = () => {
      // 导航栏滚动效果
      if (window.scrollY > 100) {
        setIsNavbarScrolled(true);
      } else {
        setIsNavbarScrolled(false);
      }

      // 滚动显示元素
      const reveals = document.querySelectorAll('.scroll-reveal');
      reveals.forEach((reveal, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          setRevealedElements(prev => new Set(prev).add(index));
        }
      });
    };

    // 数字计数动画
    const animateCounters = () => {
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        let current = 0;
        const increment = target / 100;

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current).toString();
            setTimeout(updateCounter, 20);
          } else {
            counter.textContent = target.toString();
          }
        };

        // 检查元素是否在视窗中
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        });

        observer.observe(counter);
      });
    };

    // 平滑滚动
    const setupSmoothScroll = () => {
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = (e.target as HTMLAnchorElement).getAttribute('href');
          if (targetId) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
              targetSection.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    setupSmoothScroll();
    animateCounters();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      {/* 导航栏 */}
      <nav className={`navbar ${isNavbarScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#" className="logo">太极湖智能实验室</a>
          <ul className="nav-menu">
            <li><a href="#home">首页</a></li>
            <li><a href="#features">功能</a></li>
            <li><a href="#lab">实验室</a></li>
            <li><a href="#contact">联系</a></li>
          </ul>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>太极湖智能实验室</h1>
          <p>探索人工智能的无限可能，构建智慧未来</p>
          <a href="#features" className="cta-button">探索更多</a>
        </div>
      </section>

      {/* 功能区域 */}
      <section id="features" className="features">
        <div className="container">
          <h2 className={`section-title scroll-reveal ${revealedElements.has(0) ? 'revealed' : ''}`}>核心功能</h2>
          <div className="features-grid">
            <div className={`feature-card scroll-reveal ${revealedElements.has(1) ? 'revealed' : ''}`}>
              <i className="fas fa-robot feature-icon"></i>
              <h3>AI智能对话</h3>
              <p>基于先进的自然语言处理技术，提供智能化的对话体验，支持多轮对话和上下文理解。</p>
            </div>
            
            <div className={`feature-card scroll-reveal ${revealedElements.has(2) ? 'revealed' : ''}`}>
              <i className="fas fa-chart-line feature-icon"></i>
              <h3>数据分析</h3>
              <p>强大的数据分析能力，支持多维度数据挖掘和可视化展示，助力科学决策。</p>
            </div>
            
            <div className={`feature-card scroll-reveal ${revealedElements.has(3) ? 'revealed' : ''}`}>
              <i className="fas fa-brain feature-icon"></i>
              <h3>机器学习</h3>
              <p>集成多种机器学习算法，支持模型训练、评估和部署的完整工作流。</p>
            </div>
            
            <div className={`feature-card scroll-reveal ${revealedElements.has(4) ? 'revealed' : ''}`}>
              <i className="fas fa-cloud feature-icon"></i>
              <h3>云端服务</h3>
              <p>提供稳定可靠的云端服务，支持弹性扩展和高可用性部署。</p>
            </div>
            
            <div className={`feature-card scroll-reveal ${revealedElements.has(5) ? 'revealed' : ''}`}>
              <i className="fas fa-shield-alt feature-icon"></i>
              <h3>安全保障</h3>
              <p>多层次安全防护体系，确保数据安全和隐私保护，符合国际安全标准。</p>
            </div>
            
            <div className={`feature-card scroll-reveal ${revealedElements.has(6) ? 'revealed' : ''}`}>
              <i className="fas fa-mobile-alt feature-icon"></i>
              <h3>移动端支持</h3>
              <p>全平台覆盖，支持Web、iOS、Android等多端同步，随时随地访问。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 实验室展示 */}
      <section id="lab" className="lab-showcase">
        <div className="container">
          <div className="showcase-grid">
            <div className={`showcase-content scroll-reveal ${revealedElements.has(7) ? 'revealed' : ''}`}>
              <h2>先进的实验环境</h2>
              <p>太极湖智能实验室配备了最先进的计算设备和软件环境，为AI研究和开发提供强大的技术支撑。</p>
              <p>我们的实验室支持深度学习、自然语言处理、计算机视觉等多个AI领域的研究工作。</p>
              
              <div className="tech-stack">
                <span className="tech-tag">TensorFlow</span>
                <span className="tech-tag">PyTorch</span>
                <span className="tech-tag">React Native</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">Docker</span>
                <span className="tech-tag">Kubernetes</span>
                <span className="tech-tag">AWS</span>
              </div>
            </div>
            
            <div className={`showcase-image scroll-reveal ${revealedElements.has(8) ? 'revealed' : ''}`}>
              <div className="ai-visualization">
                <div className="ai-nodes">
                  <div className="node"></div>
                  <div className="node"></div>
                  <div className="node"></div>
                  <div className="node"></div>
                </div>
                <span>AI神经网络可视化</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className={`stat-item scroll-reveal ${revealedElements.has(9) ? 'revealed' : ''}`}>
              <h3 className="counter" data-target="1000">0</h3>
              <p>活跃用户</p>
            </div>
            <div className={`stat-item scroll-reveal ${revealedElements.has(10) ? 'revealed' : ''}`}>
              <h3 className="counter" data-target="50">0</h3>
              <p>AI模型</p>
            </div>
            <div className={`stat-item scroll-reveal ${revealedElements.has(11) ? 'revealed' : ''}`}>
              <h3 className="counter" data-target="100">0</h3>
              <p>研究项目</p>
            </div>
            <div className={`stat-item scroll-reveal ${revealedElements.has(12) ? 'revealed' : ''}`}>
              <h3 className="counter" data-target="99">0</h3>
              <p>系统可用性 %</p>
            </div>
          </div>
        </div>
      </section>

      {/* 联系区域 */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className={`section-title scroll-reveal ${revealedElements.has(13) ? 'revealed' : ''}`}>联系我们</h2>
          <div className="contact-grid">
            <div className={`contact-info scroll-reveal ${revealedElements.has(14) ? 'revealed' : ''}`}>
              <h3>联系信息</h3>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>中国·太极湖科技园区</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>contact@taijihu-lab.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+86 400-123-4567</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>周一至周五 9:00-18:00</span>
              </div>
            </div>
            
            <div className={`contact-info scroll-reveal ${revealedElements.has(15) ? 'revealed' : ''}`}>
              <h3>合作机会</h3>
              <p>我们欢迎与各界合作伙伴建立联系，共同推进人工智能技术的发展和应用。</p>
              <ul style={{listStyle: 'none', paddingLeft: 0}}>
                <li style={{marginBottom: '1rem'}}><i className="fas fa-check" style={{color: '#3498db', marginRight: '0.5rem'}}></i>技术合作</li>
                <li style={{marginBottom: '1rem'}}><i className="fas fa-check" style={{color: '#3498db', marginRight: '0.5rem'}}></i>学术交流</li>
                <li style={{marginBottom: '1rem'}}><i className="fas fa-check" style={{color: '#3498db', marginRight: '0.5rem'}}></i>人才培养</li>
                <li style={{marginBottom: '1rem'}}><i className="fas fa-check" style={{color: '#3498db', marginRight: '0.5rem'}}></i>投资合作</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 太极湖智能实验室. 保留所有权利.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
