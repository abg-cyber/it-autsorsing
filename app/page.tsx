'use client';

import { useMemo, useState } from 'react';

type Service = {
  id: string;
  title: string;
  description: string;
  setup: string;
  monthly: string;
};

type CalculatorOption = {
  id: string;
  label: string;
  setup: number;
  monthly: number;
};

const services: Service[] = [
  {
    id: 'automation',
    title: 'AI Process Automation',
    description: 'Выводим повторяющиеся процессы на новый уровень: распознавание данных, обработка заявок и управленческие цепочки.',
    setup: 'от $15 000',
    monthly: '$3 200+',
  },
  {
    id: 'cloud',
    title: 'IT Outsourcing & Cloud',
    description: 'Надежная поддержка инфраструктуры, DevOps и удаленные команды для стабильности и роста без внутренних затрат.',
    setup: 'от $9 000',
    monthly: '$2 200+',
  },
  {
    id: 'analytics',
    title: 'Data & Analytics',
    description: 'Сквозная аналитика, прогнозирование и KPI-дашборды, которые дают ясные решения для управленческих задач.',
    setup: 'от $12 000',
    monthly: '$2 600+',
  },
  {
    id: 'strategy',
    title: 'AI Strategy & Integration',
    description: 'Стратегия внедрения ИИ, оценка зрелости и внедрение безопасных моделей в существующие бизнес-процессы.',
    setup: 'от $8 000',
    monthly: '$2 000+',
  },
];

const calculatorOptions: CalculatorOption[] = [
  {
    id: 'automation',
    label: 'AI Process Automation',
    setup: 15000,
    monthly: 3200,
  },
  {
    id: 'cloud',
    label: 'IT Outsourcing & Cloud',
    setup: 9000,
    monthly: 2200,
  },
  {
    id: 'analytics',
    label: 'Data & Analytics',
    setup: 12000,
    monthly: 2600,
  },
  {
    id: 'strategy',
    label: 'AI Strategy & Integration',
    setup: 8000,
    monthly: 2000,
  },
];

const sizeMultipliers = [
  { value: 'small', label: 'Малый бизнес', multiplier: 0.9, description: 'До 100 сотрудников' },
  { value: 'medium', label: 'Средний бизнес', multiplier: 1, description: '100–500 сотрудников' },
  { value: 'enterprise', label: 'Крупный бизнес', multiplier: 1.3, description: 'Свыше 500 сотрудников' },
];

const complexityMultipliers = [
  { value: 'standard', label: 'Стандартный уровень', multiplier: 1, description: 'Типовые процессы и интеграции' },
  { value: 'advanced', label: 'Повышенная сложность', multiplier: 1.2, description: 'Интеграции нескольких систем и ИИ моделей' },
  { value: 'transformative', label: 'Трансформационный проект', multiplier: 1.4, description: 'Полная цифровая трансформация и машинное обучение' },
];

export default function HomePage() {
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedComplexity, setSelectedComplexity] = useState('standard');
  const [selectedServices, setSelectedServices] = useState<string[]>(['automation', 'cloud']);

  const selectedSizeData = sizeMultipliers.find((item) => item.value === selectedSize)!;
  const selectedComplexityData = complexityMultipliers.find((item) => item.value === selectedComplexity)!;

  const totals = useMemo(() => {
    const baseSetup = calculatorOptions
      .filter((option) => selectedServices.includes(option.id))
      .reduce((sum, option) => sum + option.setup, 0);

    const baseMonthly = calculatorOptions
      .filter((option) => selectedServices.includes(option.id))
      .reduce((sum, option) => sum + option.monthly, 0);

    const setup = Math.round(baseSetup * selectedSizeData.multiplier * selectedComplexityData.multiplier / 100) * 100;
    const monthly = Math.round(baseMonthly * selectedSizeData.multiplier * selectedComplexityData.multiplier / 100) * 100;

    return {
      serviceCount: selectedServices.length,
      setup,
      monthly,
    };
  }, [selectedServices, selectedSizeData.multiplier, selectedComplexityData.multiplier]);

  const toggleService = (id: string) => {
    setSelectedServices((current) =>
      current.includes(id) ? current.filter((serviceId) => serviceId !== id) : [...current, id],
    );
  };

  return (
    <main>
      <section className="hero">
        <div className="badge">IT Outsourcing · AI интеграция</div>
        <div className="hero__top">
          <div>
            <h1 className="hero__title">Мы переводим корпорации на новые IT-стандарты с помощью искусственного интеллекта.</h1>
            <p className="hero__description">
              Комплексные решения по аутсорсингу IT, внедрению ИИ и оптимизации корпоративных процессов для роста
              и уменьшения затрат. От первого аудита до полного сопровождения команды.
            </p>
            <div className="buttons">
              <button className="button button--primary">Запросить оценку</button>
              <button className="button button--secondary">Посмотреть калькулятор</button>
            </div>
          </div>
          <div className="service-card">
            <h3>Быстрый старт</h3>
            <p>Пакет лидогенерации и оценки зрелости ИТ-инфраструктуры. Готовность к ИИ-трансформации за 30 дней.</p>
            <div className="plan-list">
              <div className="plan-item">
                <span className="plan-item__name">Анализ бизнес-процессов</span>
                <span className="plan-item__price">$4 500</span>
              </div>
              <div className="plan-item">
                <span className="plan-item__name">Стратегия ИИ внедрения</span>
                <span className="plan-item__price">$5 800</span>
              </div>
              <div className="plan-item">
                <span className="plan-item__name">Отчет с дорожной картой</span>
                <span className="plan-item__price">$2 900</span>
              </div>
            </div>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <p className="stat__value">24/7</p>
            <p className="stat__label">IT поддержка и мониторинг</p>
          </div>
          <div className="stat">
            <p className="stat__value">30%</p>
            <p className="stat__label">Экономия на операционных расходах</p>
          </div>
          <div className="stat">
            <p className="stat__value">18</p>
            <p className="stat__label">лет опыта в enterprise IT</p>
          </div>
          <div className="stat">
            <p className="stat__value">5+</p>
            <p className="stat__label">успешных отраслевых трансформаций</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__heading">
          <div>
            <h2 className="section__title">Услуги, которые создают реальный результат</h2>
            <p className="section__subtitle">
              Наш портфель услуг построен на лучших практиках лидирующих IT-компаний: от аутсорсинга команд до полного внедрения
              интеллектуальной автоматизации.
            </p>
          </div>
        </div>

        <div className="grid section-grid-3">
          {services.map((service) => (
            <article key={service.id} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="plan-list" style={{ marginTop: '22px' }}>
                <div className="plan-item">
                  <span className="plan-item__name">Старт</span>
                  <span className="plan-item__price">{service.setup}</span>
                </div>
                <div className="plan-item">
                  <span className="plan-item__name">Ежемесячно</span>
                  <span className="plan-item__price">{service.monthly}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__heading">
          <div>
            <h2 className="section__title">Калькулятор услуг и прозрачное ценообразование</h2>
            <p className="section__subtitle">
              Выбирайте услуги и сразу видите итоговую стоимость: настройка, обслуживание и уровень сложности проекта.
            </p>
          </div>
        </div>

        <div className="grid section-grid-2">
          <div className="calculator">
            <div className="calculator__group">
              <div className="label">
                <strong>Размер компании</strong>
                <p>{selectedSizeData.description}</p>
              </div>
              <select
                className="select"
                value={selectedSize}
                onChange={(event) => setSelectedSize(event.target.value)}
              >
                {sizeMultipliers.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="calculator__group">
              <div className="label">
                <strong>Сложность проекта</strong>
                <p>{selectedComplexityData.description}</p>
              </div>
              <select
                className="select"
                value={selectedComplexity}
                onChange={(event) => setSelectedComplexity(event.target.value)}
              >
                {complexityMultipliers.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="calculator__group">
              <div className="label">
                <strong>Выберите услуги</strong>
                <p>Отметьте пакеты, которые хотите включить в проект. Чем больше выбранных услуг, тем точнее будет оценка.</p>
              </div>
              <div className="checkbox-group">
                {calculatorOptions.map((option) => (
                  <label className="checkbox" key={option.id}>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(option.id)}
                      onChange={() => toggleService(option.id)}
                    />
                    <span>
                      <strong>{option.label}</strong>
                      <br />
                      Базовая настройка ${option.setup.toLocaleString()} • Ежемесячно ${option.monthly.toLocaleString()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="service-card result-card">
            <h3>Итоговая оценка</h3>
            <div className="result-row">
              <span>Количество выбранных услуг</span>
              <strong>{totals.serviceCount}</strong>
            </div>
            <div className="result-row">
              <span>Комплексная настройка</span>
              <strong>${totals.setup.toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>Ежемесячное сопровождение</span>
              <strong>${totals.monthly.toLocaleString()}</strong>
            </div>
            <div className="result-row">
              <span>Влияние размера бизнеса</span>
              <strong>{Math.round(selectedSizeData.multiplier * 100)}%</strong>
            </div>
            <div className="result-row">
              <span>Уровень сложности</span>
              <strong>{Math.round(selectedComplexityData.multiplier * 100)}%</strong>
            </div>
            <p className="label" style={{ marginTop: '18px' }}>
              Для точной сметы мы рекомендуем запросить бесплатную консультацию, на которой мы уточним точки интеграции данных и внутренняя архитектура.
            </p>
            <button className="button button--primary" style={{ width: '100%', marginTop: '12px' }}>
              Запросить коммерческое предложение
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__heading">
          <div>
            <h2 className="section__title">Почему выбирают нас</h2>
            <p className="section__subtitle">
              Профессиональные команды, глубокое понимание корпоративных задач и готовность внедрять инновации без потери бизнеса.
            </p>
          </div>
        </div>

        <div className="grid section-grid-3">
          <article className="service-card">
            <h3>Результаты сразу</h3>
            <p>Первый этап прототипа и оценка гипотез за 2–4 недели позволяют быстро увидеть экономию и эффект от ИИ.</p>
          </article>
          <article className="service-card">
            <h3>Прозрачные цены</h3>
            <p>Мы строим коммерческое предложение на основе реального анализа нагрузки, рисков и целевых показателей.</p>
          </article>
          <article className="service-card">
            <h3>Надежная эксплуатация</h3>
            <p>Поддержка 24/7, SLA и сопровождение процессов на всех этапах внедрения — от проектирования до передачи в эксплуатацию.</p>
          </article>
        </div>
      </section>

      <footer className="footer">
        © 2026 IT Outsourcing & AI Integration. Все права защищены.
      </footer>
    </main>
  );
}
