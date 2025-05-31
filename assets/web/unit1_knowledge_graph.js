// Unit 1 Knowledge Graph - Interactive D3.js Visualization
// Based on the complete Elder Theory Unit 1 structure

class Unit1KnowledgeGraph {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.selectedNode = null;
        this.searchTerm = '';
        
        // Color scheme for different categories
        this.colors = {
            core_concepts: '#4fc3f7',
            functions_geometry: '#81c784', 
            mechanics_dynamics: '#ffb74d',
            loss_functions: '#e57373',
            memory_efficiency: '#ba68c8',
            cross_domain: '#64b5f6',
            applications: '#f06292'
        };

        this.initializeGraph();
        this.setupEventListeners();
    }

    // Complete Unit 1 knowledge structure based on actual chapters
    getKnowledgeData() {
        const nodes = [
            // Core Concepts
            {
                id: 'elder_spaces',
                name: 'Elder Spaces',
                category: 'core_concepts',
                description: 'Fundamental mathematical spaces that form the foundation of Elder Theory. These are complex manifolds with special heliomorphic properties.',
                chapter: 'Introduction to Elder Spaces',
                importance: 10,
                concepts: ['Mathematical Spaces', 'Complex Manifolds', 'Topological Structure']
            },
            {
                id: 'elder_topology',
                name: 'Elder Topology',
                category: 'core_concepts', 
                description: 'Topological structure governing Elder spaces with metric properties and continuity definitions.',
                chapter: 'Introduction to Elder Topology',
                importance: 9,
                concepts: ['Metric Spaces', 'Continuity', 'Topological Properties']
            },
            {
                id: 'unified_parameter_space',
                name: 'Unified Parameter Space',
                category: 'core_concepts',
                description: 'Comprehensive parameter space that unifies all Elder Theory components with hierarchical structure.',
                chapter: 'Unified Parameter Space',
                importance: 9,
                concepts: ['Parameter Hierarchies', 'Space Unification', 'Mathematical Framework']
            },
            {
                id: 'notation_guide',
                name: 'Mathematical Notation',
                category: 'core_concepts',
                description: 'Standardized notation system for Elder Theory mathematical expressions and symbols.',
                chapter: 'Notation Guide',
                importance: 7,
                concepts: ['Mathematical Symbols', 'Notation Standards', 'Formal Language']
            },

            // Functions and Geometry
            {
                id: 'heliomorphic_functions',
                name: 'Heliomorphic Functions',
                category: 'functions_geometry',
                description: 'Advanced mathematical functions that generalize holomorphic functions with radial-phase coupling.',
                chapter: 'Heliomorphic Functions',
                importance: 10,
                concepts: ['Complex Analysis', 'Radial-Phase Coupling', 'Function Theory']
            },
            {
                id: 'heliomorphic_axioms',
                name: 'Heliomorphic Axiom System',
                category: 'functions_geometry',
                description: 'Seven fundamental axioms that define the mathematical foundation of heliomorphic functions.',
                chapter: 'Heliomorphic Axiom System',
                importance: 10,
                concepts: ['Existence & Uniqueness', 'Composition Closure', 'Differential Heritage', 'Radial-Phase Duality']
            },
            {
                id: 'elder_manifold',
                name: 'Elder Manifold',
                category: 'functions_geometry',
                description: 'Complex manifold structure with Hermitian metrics and Kähler properties for knowledge representation.',
                chapter: 'Elder Manifold',
                importance: 9,
                concepts: ['Complex Manifolds', 'Hermitian Metrics', 'Kähler Geometry']
            },
            {
                id: 'heliomorphic_geometry',
                name: 'Heliomorphic Geometry',
                category: 'functions_geometry',
                description: 'Geometric properties and structures arising from heliomorphic function theory.',
                chapter: 'Heliomorphic Geometry',
                importance: 8,
                concepts: ['Geometric Structures', 'Curvature Properties', 'Metric Geometry']
            },
            {
                id: 'hierarchical_architecture',
                name: 'Hierarchical Knowledge Architecture',
                category: 'functions_geometry',
                description: 'Three-tier architecture with Elder, Mentor, and Erudite entities for knowledge representation.',
                chapter: 'Hierarchical Knowledge Architecture',
                importance: 9,
                concepts: ['Elder-Mentor-Erudite', 'Knowledge Hierarchies', 'System Architecture']
            },
            {
                id: 'elder_set_theory',
                name: 'Elder Set Theory',
                category: 'functions_geometry',
                description: 'Specialized set theory adapted for Elder spaces with phase-preserving operations.',
                chapter: 'Elder Set Theory',
                importance: 7,
                concepts: ['Set Operations', 'Phase Preservation', 'Mathematical Foundations']
            },

            // Mechanics and Dynamics
            {
                id: 'elder_orbital_mechanics',
                name: 'Elder Orbital Mechanics',
                category: 'mechanics_dynamics',
                description: 'Gravitational dynamics governing the motion and interaction of Elder, Mentor, and Erudite entities.',
                chapter: 'Elder Orbital Mechanics',
                importance: 9,
                concepts: ['Gravitational Dynamics', 'Orbital Stability', 'Entity Interactions']
            },
            {
                id: 'gravitational_fields',
                name: 'Gravitational Field Dynamics',
                category: 'mechanics_dynamics',
                description: 'Continuous gravitational field model replacing discrete shell structures.',
                chapter: 'Gravitational Field Dynamics',
                importance: 8,
                concepts: ['Field Theory', 'Continuous Dynamics', 'Force Interactions']
            },
            {
                id: 'elder_heliosystem',
                name: 'Elder Heliosystem',
                category: 'mechanics_dynamics',
                description: 'Unified gravitational system combining orbital mechanics with knowledge representation.',
                chapter: 'Elder Heliosystem Unified',
                importance: 10,
                concepts: ['System Integration', 'Gravitational Knowledge', 'Unified Framework']
            },
            {
                id: 'resonance_mechanism',
                name: 'Resonance Mechanism',
                category: 'mechanics_dynamics',
                description: 'Phase alignment and resonance phenomena enabling efficient knowledge transfer.',
                chapter: 'Elder Resonance Algorithm',
                importance: 8,
                concepts: ['Phase Alignment', 'Resonance Phenomena', 'Knowledge Transfer']
            },
            {
                id: 'conservation_laws',
                name: 'Conservation Laws',
                category: 'mechanics_dynamics',
                description: 'Fundamental conservation principles governing energy, momentum, and information in Elder systems.',
                chapter: 'Conservation Laws',
                importance: 7,
                concepts: ['Energy Conservation', 'Momentum Conservation', 'Information Conservation']
            },

            // Loss Functions
            {
                id: 'elder_loss',
                name: 'Elder Loss Function',
                category: 'loss_functions',
                description: 'Primary loss function for Elder entities incorporating gravitational and phase dynamics.',
                chapter: 'Elder Loss',
                importance: 9,
                concepts: ['Loss Optimization', 'Gravitational Loss', 'Phase Dynamics']
            },
            {
                id: 'mentor_loss',
                name: 'Mentor Loss Function',
                category: 'loss_functions',
                description: 'Specialized loss function for Mentor entities balancing domain-specific and cross-domain learning.',
                chapter: 'Mentor Loss',
                importance: 8,
                concepts: ['Cross-Domain Learning', 'Domain Balance', 'Intermediate Optimization']
            },
            {
                id: 'erudite_loss',
                name: 'Erudite Loss Function',
                category: 'loss_functions',
                description: 'Loss function for Erudite entities focusing on specialized domain expertise.',
                chapter: 'Erudite Loss',
                importance: 8,
                concepts: ['Domain Specialization', 'Expert Knowledge', 'Specialized Learning']
            },
            {
                id: 'hierarchical_backprop',
                name: 'Hierarchical Backpropagation',
                category: 'loss_functions',
                description: 'Novel backpropagation algorithm respecting the hierarchical structure of Elder systems.',
                chapter: 'Hierarchical Backpropagation',
                importance: 8,
                concepts: ['Gradient Flow', 'Hierarchical Updates', 'Structured Learning']
            },
            {
                id: 'elder_activations',
                name: 'Elder Activation Functions',
                category: 'loss_functions',
                description: 'Specialized activation functions incorporating phase and resonance properties.',
                chapter: 'Elder Activation Functions',
                importance: 7,
                concepts: ['Activation Functions', 'Phase Modulation', 'Resonant Activations']
            },

            // Memory and Efficiency
            {
                id: 'infinite_memory',
                name: 'Infinite Memory Dynamics',
                category: 'memory_efficiency',
                description: 'Field-based memory approach achieving O(1) memory usage regardless of sequence length.',
                chapter: 'Infinite Memory Dynamics',
                importance: 9,
                concepts: ['Memory Efficiency', 'Field-Based Storage', 'Constant Memory']
            },
            {
                id: 'field_memory',
                name: 'Field-Based Memory',
                category: 'memory_efficiency',
                description: 'Mathematical formalization of memory storage through gravitational field representations.',
                chapter: 'Field-Based Memory Formalization',
                importance: 8,
                concepts: ['Memory Fields', 'Information Encoding', 'Field Storage']
            },
            {
                id: 'compression_properties',
                name: 'Compression Properties',
                category: 'memory_efficiency',
                description: 'Information compression capabilities inherent in Elder field representations.',
                chapter: 'Compression Properties',
                importance: 7,
                concepts: ['Data Compression', 'Information Theory', 'Lossless Encoding']
            },
            {
                id: 'pac_learning',
                name: 'PAC Learning Bounds',
                category: 'memory_efficiency',
                description: 'Probably Approximately Correct learning theoretical bounds for Elder systems.',
                chapter: 'PAC Learning Bounds',
                importance: 7,
                concepts: ['Learning Theory', 'Theoretical Bounds', 'Statistical Learning']
            },
            {
                id: 'complexity_analysis',
                name: 'Computational Complexity',
                category: 'memory_efficiency',
                description: 'Comprehensive analysis of computational complexity across different Elder operations.',
                chapter: 'Computational Complexity Analysis',
                importance: 8,
                concepts: ['Time Complexity', 'Space Complexity', 'Algorithmic Efficiency']
            },

            // Cross-Domain
            {
                id: 'knowledge_isomorphisms',
                name: 'Knowledge Isomorphisms',
                category: 'cross_domain',
                description: 'Mathematical isomorphisms enabling knowledge transfer between different domains.',
                chapter: 'Knowledge Isomorphisms',
                importance: 8,
                concepts: ['Isomorphic Mappings', 'Knowledge Transfer', 'Domain Bridging']
            },
            {
                id: 'transfer_theorem',
                name: 'Transfer Theorem',
                category: 'cross_domain',
                description: 'Fundamental theorem governing knowledge transfer efficiency and bounds.',
                chapter: 'Transfer Theorem',
                importance: 8,
                concepts: ['Transfer Learning', 'Theoretical Bounds', 'Cross-Domain Theory']
            },
            {
                id: 'universal_principles',
                name: 'Universal Principle Extraction',
                category: 'cross_domain',
                description: 'Methods for extracting universal principles applicable across multiple domains.',
                chapter: 'Universal Principle Extraction',
                importance: 7,
                concepts: ['Universal Patterns', 'Principle Extraction', 'Cross-Domain Patterns']
            },

            // Applications
            {
                id: 'audio_understanding',
                name: 'Audio Understanding',
                category: 'applications',
                description: 'Application of Elder Theory to audio processing and understanding tasks.',
                chapter: 'Audio Understanding',
                importance: 6,
                concepts: ['Audio Processing', 'Sound Analysis', 'Acoustic Modeling']
            },
            {
                id: 'model_unification',
                name: 'Model Unification',
                category: 'applications',
                description: 'Unification of different machine learning models under the Elder Theory framework.',
                chapter: 'Model Unification',
                importance: 7,
                concepts: ['Model Integration', 'Framework Unification', 'Architecture Bridging']
            },
            {
                id: 'multimodal_generation',
                name: 'Multimodal Generation',
                category: 'applications',
                description: 'Extension to multimodal content generation using Elder Theory principles.',
                chapter: 'Multimodal Audio Generation',
                importance: 6,
                concepts: ['Multimodal AI', 'Content Generation', 'Cross-Modal Learning']
            }
        ];

        const links = [
            // Core concept dependencies
            { source: 'elder_topology', target: 'elder_spaces', type: 'depends_on', strength: 0.9 },
            { source: 'unified_parameter_space', target: 'elder_spaces', type: 'depends_on', strength: 0.8 },
            { source: 'unified_parameter_space', target: 'elder_topology', type: 'depends_on', strength: 0.7 },
            
            // Heliomorphic function relationships
            { source: 'heliomorphic_functions', target: 'elder_spaces', type: 'depends_on', strength: 0.9 },
            { source: 'heliomorphic_axioms', target: 'heliomorphic_functions', type: 'extends', strength: 1.0 },
            { source: 'heliomorphic_geometry', target: 'heliomorphic_functions', type: 'extends', strength: 0.8 },
            { source: 'elder_manifold', target: 'heliomorphic_functions', type: 'applies_to', strength: 0.9 },
            { source: 'elder_manifold', target: 'elder_topology', type: 'depends_on', strength: 0.8 },
            
            // Architecture connections
            { source: 'hierarchical_architecture', target: 'elder_manifold', type: 'applies_to', strength: 0.8 },
            { source: 'hierarchical_architecture', target: 'unified_parameter_space', type: 'depends_on', strength: 0.7 },
            { source: 'elder_set_theory', target: 'elder_spaces', type: 'extends', strength: 0.7 },
            
            // Mechanics and dynamics
            { source: 'elder_orbital_mechanics', target: 'hierarchical_architecture', type: 'applies_to', strength: 0.9 },
            { source: 'gravitational_fields', target: 'elder_orbital_mechanics', type: 'extends', strength: 0.8 },
            { source: 'elder_heliosystem', target: 'elder_orbital_mechanics', type: 'extends', strength: 0.9 },
            { source: 'elder_heliosystem', target: 'gravitational_fields', type: 'depends_on', strength: 0.8 },
            { source: 'resonance_mechanism', target: 'elder_heliosystem', type: 'applies_to', strength: 0.8 },
            { source: 'conservation_laws', target: 'elder_orbital_mechanics', type: 'applies_to', strength: 0.7 },
            
            // Loss function relationships
            { source: 'elder_loss', target: 'elder_heliosystem', type: 'applies_to', strength: 0.9 },
            { source: 'mentor_loss', target: 'hierarchical_architecture', type: 'applies_to', strength: 0.8 },
            { source: 'erudite_loss', target: 'hierarchical_architecture', type: 'applies_to', strength: 0.8 },
            { source: 'hierarchical_backprop', target: 'elder_loss', type: 'depends_on', strength: 0.7 },
            { source: 'hierarchical_backprop', target: 'mentor_loss', type: 'depends_on', strength: 0.7 },
            { source: 'hierarchical_backprop', target: 'erudite_loss', type: 'depends_on', strength: 0.7 },
            { source: 'elder_activations', target: 'resonance_mechanism', type: 'applies_to', strength: 0.7 },
            
            // Memory and efficiency
            { source: 'infinite_memory', target: 'elder_heliosystem', type: 'applies_to', strength: 0.8 },
            { source: 'field_memory', target: 'infinite_memory', type: 'extends', strength: 0.9 },
            { source: 'field_memory', target: 'gravitational_fields', type: 'applies_to', strength: 0.8 },
            { source: 'compression_properties', target: 'field_memory', type: 'related_to', strength: 0.7 },
            { source: 'pac_learning', target: 'elder_loss', type: 'applies_to', strength: 0.6 },
            { source: 'complexity_analysis', target: 'infinite_memory', type: 'analyzes', strength: 0.7 },
            { source: 'complexity_analysis', target: 'hierarchical_backprop', type: 'analyzes', strength: 0.6 },
            
            // Cross-domain connections
            { source: 'knowledge_isomorphisms', target: 'hierarchical_architecture', type: 'applies_to', strength: 0.8 },
            { source: 'transfer_theorem', target: 'knowledge_isomorphisms', type: 'extends', strength: 0.8 },
            { source: 'universal_principles', target: 'transfer_theorem', type: 'applies_to', strength: 0.7 },
            { source: 'universal_principles', target: 'elder_heliosystem', type: 'applies_to', strength: 0.6 },
            
            // Applications
            { source: 'audio_understanding', target: 'elder_heliosystem', type: 'applies_to', strength: 0.7 },
            { source: 'audio_understanding', target: 'knowledge_isomorphisms', type: 'uses', strength: 0.6 },
            { source: 'model_unification', target: 'universal_principles', type: 'applies_to', strength: 0.7 },
            { source: 'model_unification', target: 'hierarchical_architecture', type: 'uses', strength: 0.6 },
            { source: 'multimodal_generation', target: 'transfer_theorem', type: 'uses', strength: 0.6 },
            { source: 'multimodal_generation', target: 'audio_understanding', type: 'extends', strength: 0.7 },
            
            // Cross-category relationships
            { source: 'heliomorphic_functions', target: 'elder_loss', type: 'enables', strength: 0.6 },
            { source: 'elder_manifold', target: 'field_memory', type: 'enables', strength: 0.6 },
            { source: 'resonance_mechanism', target: 'knowledge_isomorphisms', type: 'enables', strength: 0.6 },
            { source: 'notation_guide', target: 'heliomorphic_axioms', type: 'supports', strength: 0.5 }
        ];

        return { nodes, links };
    }

    initializeGraph() {
        this.svg = d3.select('#knowledgeGraph');
        this.container = this.svg.append('g');
        
        // Setup zoom behavior
        this.zoom = d3.zoom()
            .scaleExtent([0.1, 3])
            .on('zoom', (event) => {
                this.container.attr('transform', event.transform);
            });
        
        this.svg.call(this.zoom);
        
        // Get data and create simulation
        const data = this.getKnowledgeData();
        this.nodes = data.nodes;
        this.links = data.links;
        
        this.simulation = d3.forceSimulation(this.nodes)
            .force('link', d3.forceLink(this.links).id(d => d.id).distance(80).strength(0.5))
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(25));
        
        this.createVisualization();
        this.createTooltip();
    }

    createVisualization() {
        // Create links
        this.linkElements = this.container.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(this.links)
            .enter()
            .append('line')
            .attr('class', 'link')
            .attr('stroke', d => this.getLinkColor(d.type))
            .attr('stroke-width', d => Math.sqrt(d.strength * 3))
            .on('mouseover', (event, d) => this.showTooltip(event, `${d.type}: ${d.source.name} → ${d.target.name}`))
            .on('mouseout', () => this.hideTooltip());

        // Create nodes
        this.nodeElements = this.container.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(this.nodes)
            .enter()
            .append('circle')
            .attr('class', 'node')
            .attr('r', d => Math.sqrt(d.importance) * 3 + 5)
            .attr('fill', d => this.colors[d.category])
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .on('click', (event, d) => this.selectNode(d))
            .on('mouseover', (event, d) => this.showTooltip(event, d.name))
            .on('mouseout', () => this.hideTooltip())
            .call(this.drag());

        // Create labels
        this.labelElements = this.container.append('g')
            .attr('class', 'labels')
            .selectAll('text')
            .data(this.nodes)
            .enter()
            .append('text')
            .attr('class', 'node-label')
            .text(d => d.name)
            .attr('dy', d => Math.sqrt(d.importance) * 3 + 20)
            .style('font-size', d => `${Math.max(10, d.importance)}px`);

        // Update positions on simulation tick
        this.simulation.on('tick', () => {
            this.linkElements
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            this.nodeElements
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);

            this.labelElements
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });
    }

    getLinkColor(type) {
        const colors = {
            'depends_on': '#ff6b6b',
            'extends': '#4ecdc4', 
            'applies_to': '#45b7d1',
            'related_to': '#96ceb4',
            'enables': '#ffeaa7',
            'uses': '#dda0dd',
            'supports': '#98d8c8',
            'analyzes': '#f7dc6f'
        };
        return colors[type] || '#aaa';
    }

    drag() {
        return d3.drag()
            .on('start', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on('end', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });
    }

    selectNode(node) {
        // Clear previous selection
        this.nodeElements.classed('node-selected', false);
        this.linkElements.classed('link-selected', false);
        
        // Select new node
        this.selectedNode = node;
        this.nodeElements.filter(d => d === node).classed('node-selected', true);
        
        // Highlight connected links
        this.linkElements
            .classed('link-selected', d => d.source === node || d.target === node)
            .style('opacity', d => (d.source === node || d.target === node) ? 1 : 0.2);
        
        // Show info panel
        this.showInfoPanel(node);
    }

    showInfoPanel(node) {
        const panel = document.getElementById('infoPanel');
        const title = document.getElementById('nodeTitle');
        const category = document.getElementById('nodeCategory');
        const description = document.getElementById('nodeDescription');
        const connections = document.getElementById('nodeConnections');
        
        title.textContent = node.name;
        category.textContent = node.category.replace('_', ' ').toUpperCase();
        description.textContent = node.description;
        
        // Show connections
        const nodeConnections = this.links.filter(l => 
            l.source === node || l.target === node
        );
        
        connections.innerHTML = '<h4>Connections:</h4>';
        nodeConnections.forEach(link => {
            const otherNode = link.source === node ? link.target : link.source;
            const direction = link.source === node ? '→' : '←';
            const connectionDiv = document.createElement('div');
            connectionDiv.className = 'connection-item';
            connectionDiv.innerHTML = `
                <strong>${link.type}</strong> ${direction} ${otherNode.name}
            `;
            connections.appendChild(connectionDiv);
        });
        
        panel.style.display = 'block';
    }

    createTooltip() {
        this.tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);
    }

    showTooltip(event, text) {
        this.tooltip
            .style('opacity', 1)
            .html(text)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
    }

    hideTooltip() {
        this.tooltip.style('opacity', 0);
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterNodes();
        });

        // Control panel listeners
        document.getElementById('forceStrength').addEventListener('input', (e) => {
            this.simulation.force('charge').strength(-e.target.value);
            this.simulation.alpha(0.3).restart();
        });

        document.getElementById('linkDistance').addEventListener('input', (e) => {
            this.simulation.force('link').distance(e.target.value);
            this.simulation.alpha(0.3).restart();
        });

        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filterByCategory(e.target.value);
        });

        document.getElementById('connectionFilter').addEventListener('change', (e) => {
            this.filterByConnection(e.target.value);
        });

        // Zoom controls
        document.getElementById('zoomIn').addEventListener('click', () => {
            this.svg.transition().call(this.zoom.scaleBy, 1.5);
        });

        document.getElementById('zoomOut').addEventListener('click', () => {
            this.svg.transition().call(this.zoom.scaleBy, 1 / 1.5);
        });

        document.getElementById('resetZoom').addEventListener('click', () => {
            this.svg.transition().call(this.zoom.transform, d3.zoomIdentity);
        });

        // Close info panel on background click
        this.svg.on('click', (event) => {
            if (event.target.tagName === 'svg') {
                document.getElementById('infoPanel').style.display = 'none';
                this.nodeElements.classed('node-selected', false);
                this.linkElements.classed('link-selected', false).style('opacity', 0.6);
            }
        });
    }

    filterNodes() {
        this.nodeElements
            .style('opacity', d => {
                if (!this.searchTerm) return 1;
                return d.name.toLowerCase().includes(this.searchTerm) ||
                       d.description.toLowerCase().includes(this.searchTerm) ||
                       d.concepts.some(c => c.toLowerCase().includes(this.searchTerm)) ? 1 : 0.3;
            });
    }

    filterByCategory(category) {
        if (category === 'all') {
            this.nodeElements.style('opacity', 1);
            this.linkElements.style('opacity', 0.6);
        } else {
            this.nodeElements.style('opacity', d => d.category === category ? 1 : 0.2);
            this.linkElements.style('opacity', d => 
                d.source.category === category || d.target.category === category ? 0.6 : 0.1
            );
        }
    }

    filterByConnection(connectionType) {
        if (connectionType === 'all') {
            this.linkElements.style('opacity', 0.6);
        } else {
            this.linkElements.style('opacity', d => d.type === connectionType ? 1 : 0.1);
        }
    }
}

// Initialize the knowledge graph when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Unit1KnowledgeGraph();
});

// Handle window resize
window.addEventListener('resize', () => {
    const graph = new Unit1KnowledgeGraph();
});