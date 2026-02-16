import React, { useState } from 'react';
import './App.css';

function App() {
    const [studyPlans, setStudyPlans] = useState([]);
    const [planName, setPlanName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleAddPlan = () => {
        if (planName && startDate && endDate) {
            const newPlan = {
                id: Date.now(),
                name: planName,
                startDate,
                endDate,
                createdAt: new Date().toLocaleString(),
            };
            setStudyPlans([...studyPlans, newPlan]);
            setPlanName('');
            setStartDate('');
            setEndDate('');
        }
    };

    const handleDeletePlan = (id) => { 
        setStudyPlans(studyPlans.filter(plan => plan.id !== id));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>🎓 Limite 1% - Plano de Estudos Inteligente</h1>
                <p>Crie planos de estudo automáticos e melhore suas notas!</p>
            </header>
            <main className="container">
                <section className="form-section">
                    <h2>Criar Novo Plano de Estudo</h2>
                    <div className="form-group">
                        <input type="text" placeholder="Nome do Plano" value={planName} onChange={(e) => setPlanName(e.target.value)} />
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <button onClick={handleAddPlan}>Adicionar Plano</button>
                    </div>
                </section>
                <section className="plans-section">
                    <h2>Meus Planos de Estudo</h2>
                    {studyPlans.length === 0 ? (
                        <p>Nenhum plano criado ainda. Crie um para começar!</p>
                    ) : (
                        <div className="plans-list">
                            {studyPlans.map((plan) => (
                                <div key={plan.id} className="plan-card">
                                    <h3>{plan.name}</h3>
                                    <p><strong>Início:</strong> {plan.startDate}</p>
                                    <p><strong>Fim:</strong> {plan.endDate}</p>
                                    <p><small>Criado em: {plan.createdAt}</small></p>
                                    <button onClick={() => handleDeletePlan(plan.id)} className="delete-btn"> Deletar </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                <section className="features-section">
                    <h2>Recursos Premium (Em Breve)</h2>
                    <div className="features-list">
                        <div className="feature-card">
                            <h3>🔔 Lembretes Inteligentes</h3>
                            <p>Receba notificações automáticas para manter seu ritmo de estudo.</p>
                        </div>
                        <div className="feature-card">
                            <h3>🤖 Testes Gerados por IA</h3>
                            <p>Crie testes personalizados automaticamente baseados no seu conteúdo.</p>
                        </div>
                        <div className="feature-card">
                            <h3>📊 Estatísticas de Progresso</h3>
                            <p>Acompanhe seu desempenho e evolução ao longo do tempo.</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <p>&copy; 2026 Limite 1%. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default App;