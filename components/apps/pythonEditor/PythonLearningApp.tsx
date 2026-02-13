"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { ALL_EXERCICES } from '@/data/exercices/exercices';

interface TerminalLine {
    text: string;
    isError: boolean;
}

type TabType = 'exercise' | 'editor' | 'terminal';

export default function ProgressiveIDE() {
    const [levelIndex, setLevelIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<TabType>('editor');
    const [output, setOutput] = useState<TerminalLine[]>([]);
    const [activeHint, setActiveHint] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [showHint, setShowHint] = useState(false);
    
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const currentEx = ALL_EXERCICES[levelIndex];
    const [code, setCode] = useState(currentEx.initialCode);

    useEffect(() => {
        if (currentEx) {
            setCode(currentEx.initialCode);
            setOutput([]);
            setIsComplete(false);
            setActiveHint(null);
            setShowHint(false);
            setActiveTab('editor');
        }
    }, [levelIndex]);

    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            if (e.data.type === 'RESULT') {
                const [userOut, validation] = (e.data.result || "").split("---VALIDATION_START---");
                const newLogs: TerminalLine[] = [];
                if (userOut?.trim()) newLogs.push({ text: userOut.trim(), isError: false });

                if (validation?.trim()) {
                    const lines = validation.trim().split('\n');
                    lines.forEach((line: string) => {
                        if (line.includes("💡 HINT:")) {
                            setActiveHint(line.replace("💡 HINT:", "").trim());
                        } else {
                            const isPass = line.includes("PASSED");
                            newLogs.push({ text: isPass ? "✅ PASSED!" : line, isError: !isPass });
                            if (isPass) {
                                setIsComplete(true);
                                if (window.innerWidth < 1024) setActiveTab('terminal');
                            }
                        }
                    });
                }
                setOutput(newLogs);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const runCode = () => {
        if (!iframeRef.current?.contentWindow) return;
        setOutput([]);
        setActiveHint(null);
        setShowHint(false);
        if (window.innerWidth < 1024) {
            setActiveTab('terminal');
        }
        const fullUserCode = `${currentEx.lockedCode}\n${code}`;
        iframeRef.current.contentWindow.postMessage({
            type: 'RUN',
            setupCode: currentEx.setupCode,
            userCode: fullUserCode,
            secretTest: currentEx.secretTest
        }, '*');
    };

    const lockedLineCount = useMemo(() => currentEx.lockedCode.split('\n').length, [currentEx.lockedCode]);

    return (
        <div className="h-screen w-full flex flex-col bg-[#0d1117] text-white overflow-hidden font-sans">
            <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 lg:px-6 bg-[#161b22] shrink-0">
                <span className="font-mono text-[10px] lg:text-xs font-bold tracking-widest text-blue-400 uppercase">
                    Ex {currentEx.exNumber}
                </span>
                <button onClick={runCode} className="bg-green-600 hover:bg-green-500 px-4 py-1.5 rounded-md font-bold text-xs transition-all active:scale-95">
                    RUN
                </button>
            </header>

            <nav className="flex lg:hidden border-b border-white/10 bg-[#0d1117]">
                {(['exercise', 'editor', 'terminal'] as TabType[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-tighter transition-colors ${activeTab === tab ? 'text-blue-400 border-b-2 border-blue-400 bg-white/5' : 'text-gray-500'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            <main className="flex-1 flex overflow-hidden relative">

                <aside className={`${activeTab === 'exercise' ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 border-r border-white/10 flex-col bg-[#0d1117] overflow-y-auto p-6`}>
                    <h2 className="text-xl font-bold mb-4 text-gray-100">{currentEx.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line mb-6">
                        {currentEx.instruction}
                    </p>
                    {/* Hint Logic */}
                    {activeHint && (
                        <div className="border-t border-white/10 pt-4">
                            <button onClick={() => setShowHint(!showHint)} className="text-xs font-bold text-yellow-500 uppercase tracking-widest">
                                {showHint ? '▼ Hide Hint' : '▶ Need a hint?'}
                            </button>
                            {showHint && (
                                <div className="mt-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg text-xs text-yellow-200/80 leading-relaxed italic">
                                    {activeHint}
                                </div>
                            )}
                        </div>
                    )}
                </aside>

                <section className={`${activeTab === 'editor' ? 'flex' : 'hidden'} lg:flex flex-1 flex-col bg-[#1e1e1e]`}>
                   <div className="py-2 px-4 opacity-40 pointer-events-none select-none border-b border-white/5 bg-[#161b22]">
                        <pre className="font-mono text-[14px] leading-5 text-blue-300">
                            {currentEx.lockedCode}
                        </pre>
                    </div>
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            defaultLanguage="python"
                            theme="vs-dark"
                            value={code}
                            onChange={(v) => setCode(v || "")}
                            options={{
                                fontSize: 16,
                                lineNumbers: (num) => (num + lockedLineCount).toString(),
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 10 }
                            }}
                        />
                    </div>
                </section>

                <aside className={`${activeTab === 'terminal' ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 bg-black p-4 font-mono text-xs flex-col overflow-y-auto`}>
                    <div className="text-gray-600 mb-4 border-b border-white/10 pb-2 uppercase tracking-widest font-bold text-[9px]">Terminal</div>
                    {output.map((line, i) => (
                        <pre key={i} className={`whitespace-pre-wrap py-1 ${line.isError ? 'text-red-400' : 'text-green-400'}`}>
                            {line.text}
                        </pre>
                    ))}

                    {/* Next Button Logic */}
                    {isComplete && levelIndex < ALL_EXERCICES.length - 1 && (
                        <button
                            onClick={() => setLevelIndex(prev => prev + 1)}
                            className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all animate-pulse"
                        >
                            NEXT EXERCISE: {ALL_EXERCICES[levelIndex + 1].exNumber} →
                        </button>
                    )}
                </aside>
            </main>

            <iframe ref={iframeRef} src="/python-runner.html" className="hidden" />
        </div>
    );
}