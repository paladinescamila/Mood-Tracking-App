export const SAMPLE_USER: User = {
	id: 'QjemPXthw4cxCrL97KRnEftFoHi2',
	name: 'Lisa',
	email: 'lisa@mail.com',
	photo:
		'https://firebasestorage.googleapis.com/v0/b/mood-app-paladinescamila.firebasestorage.app/o/users%2FQjemPXthw4cxCrL97KRnEftFoHi2%2Fprofile.jpg?alt=media&token=24dc20c4-0e9b-4fb1-9eb6-0714ec776550',
};

export const SAMPLE_USER_CREDENTIALS: {email: string; password: string} = {
	email: SAMPLE_USER.email,
	password: import.meta.env.VITE_SAMPLE_USER_PASSWORD,
};

export const SAMPLE_MOODS_HISTORY: MoodEntry[] = [
	{
		id: 'mtqgzdak-dwxhqx63kij50k29loq1iky2rxwyqk9xf3dx',
		createdAt: '2026-03-31T10:00:00Z',
		mood: 'sad',
		feelings: ['anxious', 'lonely'],
		journalEntry: 'I feel really sad today. Nothing seems to go right.',
		sleepHours: '5-6',
	},
	{
		id: 'mtqgzdak-zwk3ly7vr1hniunx1znz0kdcpeftx7nl083r',
		createdAt: '2026-04-02T10:00:00Z',
		mood: 'happy',
		feelings: ['grateful', 'content'],
		journalEntry: 'I had a great day today! I feel grateful for my friends and family.',
		sleepHours: '7-8',
	},
	{
		id: 'mtqgzdak-hxbrt48c95x031lw8l2m91bso8ntwkq3ktar',
		createdAt: '2026-04-04T10:00:00Z',
		mood: 'very-sad',
		feelings: ['lonely', 'down'],
		journalEntry: 'I feel very sad and lonely today. I wish I had someone to talk to.',
		sleepHours: '3-4',
	},
	{
		id: 'mtqgzdak-58g3mxr29atb2zv0m9h9tlauyzz7ku3xvk9x',
		createdAt: '2026-04-06T10:00:00Z',
		mood: 'neutral',
		feelings: ['calm', 'peaceful'],
		journalEntry: 'I feel okay today. Nothing too exciting, but nothing too bad either.',
		sleepHours: '5-6',
	},
	{
		id: 'mtqgzdak-0ze909vj2nhi811wkgqxd0bcpfgf027sog44',
		createdAt: '2026-04-07T10:00:00Z',
		mood: 'happy',
		feelings: ['joyful', 'excited'],
		journalEntry:
			'I feel really happy and excited today! I have a lot of energy and I am looking forward to the weekend.',
		sleepHours: '7-8',
	},
	{
		id: 'mtqgzdak-xut6i4lb5bvcbzkwnn7elt0te8hihhnoo8u3',
		createdAt: '2026-04-09T10:00:00Z',
		mood: 'very-happy',
		feelings: ['grateful', 'optimistic'],
		journalEntry:
			'I feel very happy and optimistic today! I am grateful for all the good things in my life and I am looking forward to the future.',
		sleepHours: '9+',
	},
	{
		id: 'mtqgzdak-mi17479mmd89y9bvgzvlvgkpbmztdlam8607',
		createdAt: '2026-04-10T10:00:00Z',
		mood: 'sad',
		feelings: ['anxious', 'down'],
		journalEntry:
			'I feel really sad and anxious today. I am worried about the future and I am feeling down.',
		sleepHours: '3-4',
	},
	{
		id: 'mtqgzdak-dkgjj8oi5j62tnpmw1g78a3ij9q6b4wgudiz',
		createdAt: '2026-04-12T10:00:00Z',
		mood: 'neutral',
		feelings: ['calm', 'peaceful'],
		journalEntry: 'I feel okay today. Nothing too exciting, but nothing too bad either.',
		sleepHours: '7-8',
	},
	{
		id: 'mtqgzdak-2bwvfi7qbg9u3q9a1ayaamf2p7fjzb2iudk6',
		createdAt: '2026-04-13T10:00:00Z',
		mood: 'happy',
		feelings: ['grateful', 'content'],
		journalEntry:
			'I feel really happy and content today! I am grateful for all the good things in my life and I am looking forward to the future.',
		sleepHours: '7-8',
	},
	{
		id: 'mtqgzdak-v04b171in03f0h56z8f23lgu8n2ilbgh81jg',
		createdAt: '2026-04-14T10:00:00Z',
		mood: 'very-sad',
		feelings: ['anxious', 'lonely'],
		journalEntry: 'I feel very sad and lonely today. I wish I had someone to talk to.',
		sleepHours: '3-4',
	},
	{
		id: 'mtqgzdak-m1lrm3rwa79ulotjm0zdnthbpoplikutjkup',
		createdAt: '2026-04-15T10:00:00Z',
		mood: 'very-happy',
		feelings: ['anxious', 'excited'],
		journalEntry:
			'I feel very happy and excited today! I have a lot of energy and I am looking forward to the weekend.',
		sleepHours: '9+',
	},
];
