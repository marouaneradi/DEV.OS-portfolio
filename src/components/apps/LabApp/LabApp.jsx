import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FlaskConical,
  Database,
  Search,
  CheckCircle2,
  XCircle,
  Play,
  Terminal,
  Clock,
  Sparkles,
  Send,
  Sliders,
} from 'lucide-react';
import { labExperiments } from '../../../config/labData';

export default function LabApp() {
  const [activeTab, setActiveTab] = useState('sql');

  // --- SQL Playground State ---
  const sqlExperiment = labExperiments.find((e) => e.id === 'sql-playground');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM cooperatives;');
  const [sqlResult, setSqlResult] = useState(sqlExperiment.tables.cooperatives);
  const [sqlExecutionTime, setSqlExecutionTime] = useState(1.4);
  const [sqlError, setSqlError] = useState(null);

  const handleRunQuery = (customQuery) => {
    const q = (customQuery || sqlQuery).trim();
    setSqlError(null);

    const start = performance.now();
    try {
      const lower = q.toLowerCase();
      if (lower.includes('from cooperatives')) {
        setSqlResult(sqlExperiment.tables.cooperatives);
      } else if (lower.includes('from products')) {
        if (lower.includes('stock < 10')) {
          setSqlResult(
            sqlExperiment.tables.products.filter((p) => p.stock < 10)
          );
        } else if (lower.includes('coop_id = 1')) {
          setSqlResult(
            sqlExperiment.tables.products.filter((p) => p.coop_id === 1)
          );
        } else if (lower.includes('order by price_mad desc')) {
          const sorted = [...sqlExperiment.tables.products].sort(
            (a, b) => b.price_mad - a.price_mad
          );
          setSqlResult(sorted);
        } else {
          setSqlResult(sqlExperiment.tables.products);
        }
      } else {
        setSqlError('Unknown table. Valid tables in sandbox: cooperatives, products.');
      }
    } catch {
      setSqlError('Syntax error in query.');
    }
    setSqlExecutionTime(Number((performance.now() - start + 1.2).toFixed(2)));
  };

  // --- Regex Tester State ---
  const regexExperiment = labExperiments.find((e) => e.id === 'regex-tester');
  const [pattern, setPattern] = useState(regexExperiment.presets[0].pattern);
  const [testString, setTestString] = useState(regexExperiment.presets[0].testString);

  let isRegexMatch = false;
  let regexError = null;
  try {
    const reg = new RegExp(pattern);
    isRegexMatch = reg.test(testString);
  } catch (err) {
    regexError = err.message;
  }

  // --- API Inspector State ---
  const apiExperiment = labExperiments.find((e) => e.id === 'api-inspector');
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useState(0);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [apiResponseReceived, setApiResponseReceived] = useState(true);

  const currentEndpoint = apiExperiment.endpoints[selectedEndpointIndex];

  const handleSendApiRequest = () => {
    setIsSendingRequest(true);
    setApiResponseReceived(false);
    setTimeout(() => {
      setIsSendingRequest(false);
      setApiResponseReceived(true);
    }, currentEndpoint.latencyMs + 50);
  };

  return (
    <div className="h-full flex flex-col bg-dev-surface/95 text-slate-100 select-text font-sans">
      {/* Top Header & Tabs */}
      <div className="px-5 py-3 border-b border-white/5 bg-dev-elevated/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 text-xs font-mono">
          <FlaskConical size={15} className="text-pink-400" />
          <span className="font-semibold text-white">DEVELOPER LAB</span>
          <span className="text-slate-500 font-normal hidden sm:inline">
            // LIVE CODE & ENGINE PLAYGROUNDS
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono">
          {[
            { id: 'sql', label: 'SQL Sandbox' },
            { id: 'regex', label: 'Regex Engine' },
            { id: 'api', label: 'API Inspector' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === tab.id
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Experiment Body */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-7">
        {/* 1. SQL SANDBOX */}
        {activeTab === 'sql' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-4 rounded-os bg-dev-elevated/30 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-dev-cyan uppercase tracking-wider flex items-center gap-1.5">
                  <Database size={13} />
                  <span>// INTERACTIVE SQL CONSOLE (ORMVAO SCHEMA)</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Tables: cooperatives, products
                </span>
              </div>

              {/* Sample query shortcuts */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] font-mono text-slate-500 mr-1">Presets:</span>
                {sqlExperiment.sampleQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSqlQuery(q);
                      handleRunQuery(q);
                    }}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-colors truncate max-w-[240px]"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Query editor */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunQuery()}
                  placeholder="Enter SQL query..."
                  className="flex-1 px-3 py-2 rounded bg-black/50 border border-white/10 text-xs font-mono text-dev-cyan focus:outline-none focus:border-dev-cyan"
                />
                <button
                  onClick={() => handleRunQuery()}
                  className="flex items-center gap-1.5 px-3 py-2 rounded bg-dev-cyan/20 hover:bg-dev-cyan/30 border border-dev-cyan/40 text-dev-cyan text-xs font-mono font-semibold transition-colors"
                >
                  <Play size={12} />
                  <span>RUN</span>
                </button>
              </div>
            </div>

            {/* Error banner */}
            {sqlError && (
              <div className="p-3 rounded bg-dev-rose/10 border border-dev-rose/30 text-dev-rose text-xs font-mono">
                Error: {sqlError}
              </div>
            )}

            {/* Query Results Table */}
            {sqlResult && sqlResult.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                  <span>QUERY RESULTS ({sqlResult.length} rows returned)</span>
                  <span className="flex items-center gap-1 text-dev-emerald">
                    <Clock size={11} />
                    <span>{sqlExecutionTime} ms</span>
                  </span>
                </div>

                <div className="border border-white/10 rounded-os overflow-hidden overflow-x-auto bg-black/40">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-white/5 border-b border-white/10 text-slate-400">
                      <tr>
                        {Object.keys(sqlResult[0]).map((key) => (
                          <th key={key} className="px-4 py-2 font-medium">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-200">
                      {sqlResult.map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          {Object.values(row).map((val, j) => (
                            <td key={j} className="px-4 py-2">
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. REGEX PATTERN ENGINE */}
        {activeTab === 'regex' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-4 rounded-os bg-dev-elevated/30 border border-white/5 space-y-3">
              <span className="text-xs font-mono text-pink-400 uppercase tracking-wider block">
                // REGEX PATTERN VERIFICATION
              </span>

              {/* Presets */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] font-mono text-slate-500 mr-1">Presets:</span>
                {regexExperiment.presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPattern(preset.pattern);
                      setTestString(preset.testString);
                    }}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              {/* Pattern input */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">
                  Pattern (/expression/):
                </label>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-xs font-mono text-pink-400 focus:outline-none focus:border-pink-400"
                />
              </div>

              {/* Test String input */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">
                  Target String to Test:
                </label>
                <input
                  type="text"
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-dev-cyan"
                />
              </div>
            </div>

            {/* Validation Outcome Card */}
            <div className="p-5 rounded-os bg-dev-elevated/20 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">MATCH STATUS:</span>
                {regexError ? (
                  <span className="text-xs font-mono text-dev-rose">
                    Invalid Regex
                  </span>
                ) : isRegexMatch ? (
                  <span className="text-xs font-mono text-dev-emerald flex items-center gap-1.5 font-bold">
                    <CheckCircle2 size={14} />
                    <span>VALID MATCH (PASSED)</span>
                  </span>
                ) : (
                  <span className="text-xs font-mono text-dev-rose flex items-center gap-1.5 font-bold">
                    <XCircle size={14} />
                    <span>NO MATCH (FAILED)</span>
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-400">
                Pattern evaluated natively against the browser JavaScript RegExp engine.
              </p>
            </div>
          </div>
        )}

        {/* 3. API INSPECTOR */}
        {activeTab === 'api' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-4 rounded-os bg-dev-elevated/30 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-dev-emerald uppercase tracking-wider">
                  // TELEMETRY & ENDPOINT INSPECTOR
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Host: DEV.OS / Kernel
                </span>
              </div>

              {/* Endpoint selection & Send button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded bg-black/50 border border-white/10 text-xs font-mono">
                  <span className="px-1.5 py-0.5 rounded bg-dev-emerald/20 text-dev-emerald font-bold text-[10px]">
                    {currentEndpoint.method}
                  </span>
                  <select
                    value={selectedEndpointIndex}
                    onChange={(e) => setSelectedEndpointIndex(Number(e.target.value))}
                    className="bg-transparent text-slate-200 outline-none flex-1 font-mono"
                  >
                    {apiExperiment.endpoints.map((ep, idx) => (
                      <option key={idx} value={idx} className="bg-dev-surface text-slate-200">
                        {ep.path}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSendApiRequest}
                  disabled={isSendingRequest}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-dev-emerald/20 hover:bg-dev-emerald/30 border border-dev-emerald/40 text-dev-emerald text-xs font-mono font-semibold transition-colors disabled:opacity-50"
                >
                  <Send size={12} />
                  <span>{isSendingRequest ? 'DISPATCHING...' : 'DISPATCH'}</span>
                </button>
              </div>
            </div>

            {/* Response Payload */}
            {apiResponseReceived && (
              <div className="p-5 rounded-os bg-dev-elevated/20 border border-white/5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-dev-emerald font-bold">HTTP {currentEndpoint.status} OK</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{currentEndpoint.latencyMs}ms roundtrip</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 block">Response JSON:</span>
                  <pre className="p-3.5 rounded bg-black/50 border border-white/5 text-xs font-mono text-dev-cyan overflow-x-auto">
                    {JSON.stringify(currentEndpoint.response, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
