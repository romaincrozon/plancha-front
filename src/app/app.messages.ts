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
		label: 'Terminé',
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
  colors: ['#222222', '#333333', '#444444', '#555555', '#666666'],
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