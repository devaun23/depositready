import type { StateCode } from './types';

export interface CourtInfo {
  courthouseUrl: string;
  claimFormName: string;
  serviceMethod: string;
  feeWaiverAvailable: boolean;
  feeWaiverNote: string;
  typicalHearingTimeline: string;
  collectionMethods: string[];
  filingTips: string[];
}

const COURT_INFO_REGISTRY: Record<StateCode, CourtInfo> = {
  FL: {
    courthouseUrl: 'https://www.flcourts.gov/Florida-Courts/Trial-Courts-Circuit',
    claimFormName: 'Statement of Claim (Small Claims)',
    serviceMethod: 'Certified mail or sheriff service',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Application for Determination of Civil Indigent Status available at clerk\'s office.',
    typicalHearingTimeline: '30-60 days after filing',
    collectionMethods: ['Writ of Execution', 'Bank garnishment', 'Wage garnishment', 'Lien on property'],
    filingTips: [
      'File in the county where the rental property is located',
      'Bring copies of your lease, deposit receipt, and demand letter',
      'Pre-trial mediation is typically offered before the hearing',
    ],
  },
  CA: {
    courthouseUrl: 'https://www.courts.ca.gov/selfhelp-smallclaims.htm',
    claimFormName: 'Plaintiff\'s Claim and ORDER to Go to Small Claims Court (SC-100)',
    serviceMethod: 'Personal service, substituted service, or certified mail',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Fee waiver form FW-001 available. Income-based eligibility.',
    typicalHearingTimeline: '30-70 days after filing',
    collectionMethods: ['Writ of Execution', 'Bank levy', 'Wage garnishment', 'Keeper levy', 'Lien on property'],
    filingTips: [
      'No attorneys allowed in small claims court for either side',
      'File in the county where the defendant lives or where the rental property is located',
      'Bring organized evidence: photos, lease, communications, receipts',
    ],
  },
  TX: {
    courthouseUrl: 'https://www.txcourts.gov/about-texas-courts/trial-courts/',
    claimFormName: 'Plaintiff\'s Original Petition (Small Claims)',
    serviceMethod: 'Personal service by constable or process server',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Statement of Inability to Afford Payment of Court Costs available.',
    typicalHearingTimeline: '30-45 days after filing',
    collectionMethods: ['Writ of Execution', 'Bank garnishment', 'Property lien', 'Abstract of judgment'],
    filingTips: [
      'File in the Justice of the Peace court in the precinct where the property is located',
      'Texas allows $100 statutory damages plus 3x the wrongfully withheld amount',
      'Demand letter must be sent before filing (30-day cure period)',
    ],
  },
  NY: {
    courthouseUrl: 'https://www.nycourts.gov/courts/nyc/smallclaims/',
    claimFormName: 'Statement of Claim (Small Claims)',
    serviceMethod: 'Court clerk sends notice by certified and regular mail',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Fee waiver available for income-eligible plaintiffs.',
    typicalHearingTimeline: '30-60 days after filing',
    collectionMethods: ['Income execution', 'Property execution', 'Bank restraining notice', 'Information subpoena'],
    filingTips: [
      'NYC Small Claims limit is $10,000; rest of state is $5,000',
      'Evening sessions available in NYC courts',
      'Arbitration is offered as an alternative to trial',
    ],
  },
  GA: {
    courthouseUrl: 'https://georgiacourts.gov/magistrate-courts/',
    claimFormName: 'Statement of Claim (Magistrate Court)',
    serviceMethod: 'Personal service by marshal or constable',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Poverty affidavit (pauper\'s affidavit) available at clerk\'s office.',
    typicalHearingTimeline: '30-45 days after filing',
    collectionMethods: ['Writ of Execution (Fi. Fa.)', 'Bank garnishment', 'Property levy'],
    filingTips: [
      'File in the magistrate court of the county where the landlord resides or property is located',
      'Georgia requires landlords to return deposits within 30 days',
      'Bring your lease and any inspection reports',
    ],
  },
  IL: {
    courthouseUrl: 'https://www.illinoiscourts.gov/courts/circuit-court/',
    claimFormName: 'Small Claims Complaint',
    serviceMethod: 'Personal service by sheriff or special process server',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Application for Waiver of Court Fees available.',
    typicalHearingTimeline: '30-60 days after filing',
    collectionMethods: ['Citation to Discover Assets', 'Wage deduction', 'Bank garnishment', 'Non-wage garnishment'],
    filingTips: [
      'Chicago has additional protections under the RLTO (Residential Landlord Tenant Ordinance)',
      'File in the county where the property is located',
      'Illinois allows 1x-2x the deposit as damages depending on the violation',
    ],
  },
  NJ: {
    courthouseUrl: 'https://www.njcourts.gov/self-help/small-claims',
    claimFormName: 'Small Claims Complaint',
    serviceMethod: 'Certified mail by court clerk or personal service',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Fee waiver application available for eligible plaintiffs.',
    typicalHearingTimeline: '30-60 days after filing',
    collectionMethods: ['Writ of Execution', 'Bank levy', 'Wage execution'],
    filingTips: [
      'File in the Special Civil Part of the county where the landlord lives or property is located',
      'NJ requires deposits to be held in a separate interest-bearing account',
      'Landlords must provide a receipt and annual interest statement',
    ],
  },
  AZ: {
    courthouseUrl: 'https://www.azcourts.gov/selfservicecenter/Small-Claims',
    claimFormName: 'Small Claims Complaint',
    serviceMethod: 'Certified mail, personal service, or acceptance of service',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Fee deferral or waiver available based on income.',
    typicalHearingTimeline: '30-60 days after filing',
    collectionMethods: ['Writ of Garnishment', 'Writ of Execution', 'Property lien'],
    filingTips: [
      'File in Justice Court in the precinct where the property or landlord is located',
      'Arizona requires deposits returned within 14 days',
      'No appeals from small claims decisions in Arizona',
    ],
  },
  CO: {
    courthouseUrl: 'https://www.courts.state.co.us/Self_Help/smallclaims/',
    claimFormName: 'Notice, Claim, and Summons to Appear for Trial (JDF 250)',
    serviceMethod: 'Certified mail or personal service by sheriff or process server',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Motion to File Without Payment available.',
    typicalHearingTimeline: '30-90 days after filing',
    collectionMethods: ['Writ of Execution', 'Garnishment', 'Property lien'],
    filingTips: [
      'File in the county court where the landlord resides or property is located',
      'Colorado allows 3x the withheld amount as damages',
      'Mediation is available and often encouraged before trial',
    ],
  },
  WA: {
    courthouseUrl: 'https://www.courts.wa.gov/newsinfo/resources/?fa=newsinfo_jury.scc',
    claimFormName: 'Notice of Small Claim (SC Form)',
    serviceMethod: 'Certified mail or personal service',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Order of Indigency form available at clerk\'s office.',
    typicalHearingTimeline: '30-60 days after filing',
    collectionMethods: ['Writ of Execution', 'Bank garnishment', 'Wage garnishment'],
    filingTips: [
      'File in the district court of the county where the property is located',
      'Washington requires deposits returned within 21 days',
      'Bring evidence of the deposit payment and any move-out inspection',
    ],
  },
  NC: {
    courthouseUrl: 'https://www.nccourts.gov/help-topics/lawsuits-and-claims/small-claims',
    claimFormName: 'Complaint in Summary Ejectment / Money Owed (Magistrate Form)',
    serviceMethod: 'Certified mail or personal service by sheriff',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Petition to Proceed as an Indigent (AOC-G-106) available.',
    typicalHearingTimeline: '20-30 days after filing',
    collectionMethods: ['Execution on judgment', 'Wage garnishment', 'Bank attachment'],
    filingTips: [
      'File in Magistrate (Small Claims) Court in the county where the property is located',
      'North Carolina has some of the fastest hearing timelines',
      'Either party can appeal to District Court for a new trial',
    ],
  },
  VA: {
    courthouseUrl: 'https://www.vacourts.gov/courts/gd/home.html',
    claimFormName: 'Warrant in Debt (DC-412)',
    serviceMethod: 'Personal service by sheriff',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Petition for Proceeding in Forma Pauperis available.',
    typicalHearingTimeline: '30-60 days after filing',
    collectionMethods: ['Writ of Fieri Facias', 'Garnishment', 'Lien'],
    filingTips: [
      'File a Warrant in Debt in the General District Court',
      'Virginia requires deposits returned within 45 days',
      'Bring the lease, deposit receipt, and any written communications',
    ],
  },
  OH: {
    courthouseUrl: 'https://www.ohiojudges.org/small-claims',
    claimFormName: 'Complaint (Small Claims Division)',
    serviceMethod: 'Certified mail by court clerk or personal service',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Affidavit of Indigency available for fee waiver.',
    typicalHearingTimeline: '30-60 days after filing',
    collectionMethods: ['Garnishment of bank accounts', 'Wage garnishment', 'Judgment lien on property'],
    filingTips: [
      'File in the small claims division of Municipal Court or County Court',
      'Ohio requires deposits returned within 30 days',
      'Counterclaims by the landlord are allowed in small claims',
    ],
  },
  PA: {
    courthouseUrl: 'https://www.pacourts.us/courts/minor-courts',
    claimFormName: 'Statement of Claim (Civil Action - Magisterial District Court)',
    serviceMethod: 'Certified mail by court or personal service by constable',
    feeWaiverAvailable: true,
    feeWaiverNote: 'In Forma Pauperis petition available for fee waiver.',
    typicalHearingTimeline: '30-45 days after filing',
    collectionMethods: ['Writ of Execution', 'Bank attachment', 'Wage attachment'],
    filingTips: [
      'File in the Magisterial District Court where the property is located',
      'Pennsylvania requires deposits returned within 30 days of lease termination',
      'Landlords who wrongfully withhold may owe double the deposit amount',
    ],
  },
  MI: {
    courthouseUrl: 'https://www.courts.michigan.gov/self-help/small-claims/',
    claimFormName: 'Affidavit and Claim (Small Claims)',
    serviceMethod: 'Certified mail, personal service, or court officer',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Fee waiver request form MC 20 available.',
    typicalHearingTimeline: '30-60 days after filing',
    collectionMethods: ['Garnishment of wages', 'Garnishment of bank accounts', 'Seizure of assets'],
    filingTips: [
      'File in the Small Claims Division of District Court',
      'Michigan requires deposits returned within 30 days',
      'Landlords who fail to comply may owe 1.5x the deposit',
    ],
  },
  MA: {
    courthouseUrl: 'https://www.mass.gov/info-details/small-claims',
    claimFormName: 'Statement of Small Claim and Notice of Trial',
    serviceMethod: 'Court sends notice by first-class mail',
    feeWaiverAvailable: true,
    feeWaiverNote: 'Affidavit of Indigency form available.',
    typicalHearingTimeline: '30-60 days after filing',
    collectionMethods: ['Execution on judgment', 'Bank attachment', 'Wage garnishment', 'Property lien'],
    filingTips: [
      'File in the Boston Municipal Court or District Court Small Claims session',
      'Massachusetts allows triple damages for wrongful withholding',
      'No appeals by the plaintiff in small claims; defendant can appeal to jury trial',
    ],
  },
};

/**
 * Get court filing info for a specific state.
 */
export function getCourtInfo(stateCode: StateCode): CourtInfo {
  return COURT_INFO_REGISTRY[stateCode];
}
