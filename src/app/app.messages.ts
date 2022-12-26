export const appProperties = {
  todo: {
  	recurrence: {
  		0: 'Quotidienne',
  		1: 'Mensuelle'
  	},
  	categories: {
		0: 'Pilotage',
		1: 'Dev',
	},
  },
  criticity: {
	1: { class: 'cell-background-red'},
	2: { class: 'cell-background-orange'},
	3: { class: 'cell-background-yellow'},
	4: { class: 'cell-background-green'},
	5: { class: 'cell-background-white'},
  },
  implication: {
	1: { label: 'Temps plein'},
	2: { label: '90%'},
	3: { label: '80%'},
	4: { label: '70%'},
	5: { label: '60%'},
	6: { label: 'Mi-temps'},
	7: { label: '40%'},
	8: { label: '30%'},
	9: { label: '20%'},
	10: { label: '10%'},
  },
  type: {
	0: {
		label: 'En cours',
		color: '#222222',
	},
	1: {
		label: 'Prev',
		color: '#444444',
	}
  },
  status: {
	0: {
		label: 'A traiter',
		color: '#333333',
	},
	1: {
		label: 'A valider',
		color: '#222222',
	},
  },
  todoStatus: {
	1: {
		label: 'A faire',
		color: '#333333',
	},
	2: {
		label: 'En cours',
		color: '#444444',
	},
	3: {
		label: 'Termin�',
		color: '#555555',
	},
  },  
  todoCategory: {
	1: {
		label: 'Dev',
	},
	2: {
		label: 'Pilotage',
	},
	3: {
		label: 'Transverse',
	},
  },
  todoPriority: {
	1: {
		label: 'Urgent',
	},
	2: {
		label: 'Normal',
	},
  },
  colors: ['#F08784', '#EB3324', '#774342', '#3A0603', '#9FFCFD', '#3282F6', '#0023F5', '#00129A', '#FFFE91', '#F09B59', '#784315', '#817F26', '#7E84F7', '#732BF5', '#3580BB', '#00023D', '#58135E', '#A1FB8E', '#EF88BE', '#EA3FF7', '#EA3680', '#7F82BB', '#75163F', '#377D22', '#367E7F', '#183E0C', '#741B7C', '#39107B', '#000000', '#808080', '#C0C0C0'],
  roles: {
  	1: {
  		label:'Dev', 
  		class: 'border-cell-blue',
  	},
  	2: {
  		label:'Team leader', 
  		class: 'border-cell-green',
  	},
  	3: {
  		label:'Tech lead', 
  		class: 'border-cell-yellow',
  	},
  	4: {
  		label:'Architecte', 
  		class: 'border-cell-orange',
  	},
  	5: {
  		label:'Directeur', 
  		class: 'border-cell-red',
  	}
  }
};