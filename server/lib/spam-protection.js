/**
 * Spam protection utilities
 * - Rate limiting (5 requests per 15 minutes per IP)
 * - Disposable email blocking (100+ domains)
 * - Honeypot field detection
 * - Spam pattern detection
 */

// ============================================
// RATE LIMITING
// ============================================

// In-memory store for rate limiting (resets on server restart)
const rateLimitStore = new Map();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now - data.firstRequest > 15 * 60 * 1000) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Check if an IP is rate limited
 * @param {string} ip - The client IP address
 * @param {number} maxRequests - Maximum requests allowed (default: 5)
 * @param {number} windowMs - Time window in milliseconds (default: 15 minutes)
 * @returns {{allowed: boolean, remaining: number, resetIn: number}}
 */
export function checkRateLimit(ip, maxRequests = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const key = `rate:${ip}`;

  let data = rateLimitStore.get(key);

  if (!data || now - data.firstRequest > windowMs) {
    // New window
    data = { count: 1, firstRequest: now };
    rateLimitStore.set(key, data);
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  data.count++;

  if (data.count > maxRequests) {
    const resetIn = windowMs - (now - data.firstRequest);
    return { allowed: false, remaining: 0, resetIn };
  }

  return {
    allowed: true,
    remaining: maxRequests - data.count,
    resetIn: windowMs - (now - data.firstRequest)
  };
}

// ============================================
// DISPOSABLE EMAIL BLOCKING
// ============================================

// Common disposable email domains (100+)
const DISPOSABLE_DOMAINS = new Set([
  // Popular temporary email services
  'tempmail.com', 'temp-mail.org', 'tempmail.net', 'temp-mail.io',
  'guerrillamail.com', 'guerrillamail.org', 'guerrillamailblock.com',
  'mailinator.com', 'mailinator.net', 'mailinator.org', 'mailinator2.com',
  '10minutemail.com', '10minutemail.net', '10minmail.com',
  'throwaway.email', 'throwawaymail.com',
  'fakeinbox.com', 'fakemailgenerator.com',
  'yopmail.com', 'yopmail.fr', 'yopmail.net',
  'maildrop.cc', 'mailnesia.com', 'mailcatch.com',
  'dispostable.com', 'disposablemail.com',
  'getairmail.com', 'getnada.com', 'nada.email',
  'mohmal.com', 'emailondeck.com',
  'trashmail.com', 'trashmail.net', 'trashmail.org', 'trashemail.de',
  'sharklasers.com', 'grr.la', 'guerrillamail.info',
  'spamgourmet.com', 'mytrashmail.com',
  'mailexpire.com', 'tempinbox.com',
  'discard.email', 'discardmail.com',
  'spamfree24.org', 'spamfree.eu',
  'emailfake.com', 'emkei.cz',
  'anonymbox.com', 'anonymmail.net',
  'binkmail.com', 'bobmail.info',
  'bofthew.com', 'brefmail.com',
  'bugmenot.com', 'bumpymail.com',
  'chammy.info', 'cheatmail.de',
  'crazymailing.com', 'deadaddress.com',
  'despam.it', 'devnullmail.com',
  'dfgh.net', 'digitalsanctuary.com',
  'discardmail.de', 'disposableaddress.com',
  'disposeamail.com', 'disposemail.com',
  'dispostable.com', 'dm.w3internet.co.uk',
  'dodgeit.com', 'dodgemail.de',
  'dodgit.com', 'dontreg.com',
  'e4ward.com', 'emailias.com',
  'emailmiser.com', 'emailtemporario.com.br',
  'emailthe.net', 'emailto.de',
  'etranquil.com', 'etranquil.net',
  'evopo.com', 'explodemail.com',
  'filzmail.com', 'fivemail.de',
  'fleckens.hu', 'getonemail.com',
  'ghosttexter.de', 'girlsundertheinfluence.com',
  'gishpuppy.com', 'goemailgo.com',
  'great-host.in', 'greensloth.com',
  'haltospam.com', 'hatespam.org',
  'hidemail.de', 'hidzz.com',
  'hotpop.com', 'ieh-mail.de',
  'ihateyoualot.info', 'imails.info',
  'inboxalias.com', 'incognitomail.com',
  'jetable.com', 'jetable.fr.nf',
  'jnxjn.com', 'kasmail.com',
  'killmail.com', 'killmail.net',
  'kir.ch.tc', 'klassmaster.com',
  'klzlv.com', 'kulturbetrieb.info',
  'kurzepost.de', 'lawlita.com',
  'letthemeatspam.com', 'lhsdv.com',
  'lifebyfood.com', 'link2mail.net',
  'litedrop.com', 'lol.ovpn.to',
  'lookugly.com', 'lopl.co.cc',
  'lortemail.dk', 'lroid.com',
  'maboard.com', 'mail-hierarchie.net',
  'mail2rss.org', 'mail333.com',
  'mail4trash.com', 'mailbidon.com',
  'mailblocks.com', 'mailcatch.com',
  'mailde.de', 'mailde.info',
  'maildu.de', 'maileater.com',
  'mailed.in', 'mailexpire.com',
  'mailfa.tk', 'mailfork.com',
  'mailfreeonline.com', 'mailguard.me',
  'mailin8r.com', 'mailinater.com',
  'mailinator.us', 'mailismagic.com',
  'mailmate.com', 'mailme.lv',
  'mailmetrash.com', 'mailmoat.com',
  'mailnator.com', 'mailnull.com',
  'mailorg.org', 'mailseal.de',
  'mailshell.com', 'mailsiphon.com',
  'mailslite.com', 'mailzilla.com',
  'mailzilla.org', 'mbx.cc',
  'mega.zik.dj', 'meinspamschutz.de',
  'meltmail.com', 'messagebeamer.de',
  'mierdamail.com', 'mintemail.com',
  'mjukgansen.nu', 'moakt.com',
  'mobi.web.id', 'moburl.com',
  'moncourrier.fr.nf', 'monemail.fr.nf',
  'monmail.fr.nf', 'monumentmail.com',
  'mt2009.com', 'mt2014.com',
  'mypartyclip.de', 'myphantomemail.com',
  'myspaceinc.com', 'myspaceinc.net',
  'myspacepimpedup.com', 'mytrashmail.com',
  'neomailbox.com', 'nepwk.com',
  'nervmich.net', 'nervtmansen.de',
  'netmails.com', 'netmails.net',
  'netzidiot.de', 'neverbox.com',
  'no-spam.ws', 'nobulk.com',
  'noclickemail.com', 'nogmailspam.info',
  'nomail.xl.cx', 'nomail2me.com',
  'nomorespamemails.com', 'nospam.ze.tc',
  'nospam4.us', 'nospamfor.us',
  'nospammail.net', 'nospamthanks.info',
  'notmailinator.com', 'nowmymail.com',
  'nurfuerspam.de', 'nus.edu.sg',
  'nwldx.com', 'objectmail.com',
  'obobbo.com', 'odnorazovoe.ru',
  'oneoffemail.com', 'onewaymail.com',
  'oopi.org', 'ordinaryamerican.net',
  'otherinbox.com', 'ourklips.com',
  'outlawspam.com', 'ovpn.to',
  'owlpic.com', 'pancakemail.com',
  'pjjkp.com', 'plexolan.de',
  'poczta.onet.pl', 'politikerclub.de',
  'poofy.org', 'pookmail.com',
  'privacy.net', 'privy-mail.com',
  'privymail.de', 'proxymail.eu',
  'prtnx.com', 'punkass.com',
  'putthisinyourspamdatabase.com', 'qq.com',
  'quickinbox.com', 'quickmail.nl',
  'rainmail.biz', 'rcpt.at',
  'reallymymail.com', 'realtyalerts.ca',
  'recode.me', 'recursor.net',
  'recyclemail.dk', 'regbypass.com',
  'regbypass.comsafe-mail.net', 'rejectmail.com',
  'reliable-mail.com', 'remail.cf',
  'rhyta.com', 'rklips.com',
  'rmqkr.net', 'royal.net',
  'rppkn.com', 'rtrtr.com',
  's0ny.net', 'safe-mail.net',
  'safersignup.de', 'safetymail.info',
  'safetypost.de', 'sandelf.de',
  'saynotospams.com', 'schafmail.de',
  'scatmail.com', 'schemafarm.com',
  'selfdestructingmail.com', 'sendspamhere.com',
  'sharedmailbox.org', 'sharklasers.com',
  'shieldedmail.com', 'shiftmail.com',
  'shitmail.me', 'shortmail.net',
  'shut.name', 'shut.ws',
  'sibmail.com', 'sinnlos-mail.de',
  'siteposter.net', 'skeefmail.com',
  'slaskpost.se', 'slopsbox.com',
  'smashmail.de', 'smellfear.com',
  'snakemail.com', 'sneakemail.com',
  'sneakmail.de', 'snkmail.com',
  'sofimail.com', 'sofort-mail.de',
  'sogetthis.com', 'soodonims.com',
  'spam.la', 'spam.su',
  'spam4.me', 'spamail.de',
  'spamarrest.com', 'spamavert.com',
  'spambob.com', 'spambob.net',
  'spambog.com', 'spambog.de',
  'spambog.ru', 'spambox.info',
  'spambox.irishspringrealty.com', 'spambox.us',
  'spamcannon.com', 'spamcannon.net',
  'spamcero.com', 'spamcon.org',
  'spamcorptastic.com', 'spamcowboy.com',
  'spamcowboy.net', 'spamcowboy.org',
  'spamday.com', 'spamex.com',
  'spamfree.eu', 'spamfree24.com',
  'spamfree24.de', 'spamfree24.eu',
  'spamfree24.info', 'spamfree24.net',
  'spamgoes.in', 'spamgourmet.com',
  'spamgourmet.net', 'spamgourmet.org',
  'spamherelots.com', 'spamhereplease.com',
  'spamhole.com', 'spamify.com',
  'spaminator.de', 'spamkill.info',
  'spaml.com', 'spaml.de',
  'spammotel.com', 'spamobox.com',
  'spamoff.de', 'spamslicer.com',
  'spamspot.com', 'spamstack.net',
  'spamthis.co.uk', 'spamthisplease.com',
  'spamtrail.com', 'spamtroll.net',
  'speed.1s.fr', 'spoofmail.de',
  'squizzy.de', 'ssoia.com',
  'startkeys.com', 'stinkefinger.net',
  'stop-my-spam.cf', 'stop-my-spam.com',
  'stop-my-spam.ga', 'stop-my-spam.ml',
  'stop-my-spam.pp.ua', 'stop-my-spam.tk',
  'streetwisemail.com', 'stuffmail.de',
  'supergreatmail.com', 'supermailer.jp',
  'superrito.com', 'superstachel.de',
  'suremail.info', 'svk.jp',
  'sweetxxx.de', 'tagyourself.com',
  'teewars.org', 'teleworm.com',
  'teleworm.us', 'temp.emeraldwebmail.com',
  'temp.headstrong.de', 'tempalias.com',
  'tempe-mail.com', 'tempemail.biz',
  'tempemail.com', 'tempemail.co.za',
  'tempemail.net', 'tempinbox.co.uk',
  'tempinbox.com', 'tempmail.it',
  'tempmail2.com', 'tempmaildemo.com',
  'tempmailer.com', 'tempmailer.de',
  'tempomail.fr', 'temporarily.de',
  'temporarioemail.com.br', 'temporaryemail.net',
  'temporaryemail.us', 'temporaryforwarding.com',
  'temporaryinbox.com', 'tempthe.net',
  'thankyou2010.com', 'thc.st',
  'thelimestones.com', 'thisisnotmyrealemail.com',
  'thismail.net', 'thismail.ru',
  'throam.com', 'throwam.com',
  'throwawayemailaddress.com', 'tilien.com',
  'tmail.ws', 'tmailinator.com',
  'toiea.com', 'toomail.biz',
  'topranklist.de', 'tradermail.info',
  'trash-amil.com', 'trash-mail.at',
  'trash-mail.com', 'trash-mail.de',
  'trash2009.com', 'trash2010.com',
  'trash2011.com', 'trashdevil.com',
  'trashdevil.de', 'trashemail.de',
  'trashmail.at', 'trashmail.me',
  'trashmail.ws', 'trashmailer.com',
  'trashymail.com', 'trashymail.net',
  'trbvm.com', 'trickmail.net',
  'trillianpro.com', 'tryalert.com',
  'turual.com', 'twinmail.de',
  'twoweirdtricks.com', 'tyldd.com',
  'uggsrock.com', 'umail.net',
  'upliftnow.com', 'uplipht.com',
  'uroid.com', 'us.af',
  'valemail.net', 'venompen.com',
  'veryrealemail.com', 'viditag.com',
  'viewcastmedia.com', 'viewcastmedia.net',
  'viewcastmedia.org', 'viralplays.com',
  'vkcode.ru', 'voize.eu',
  'w3internet.co.uk', 'walkmail.net',
  'webemail.me', 'webm4il.info',
  'webuser.in', 'wee.my',
  'weg-werf-email.de', 'wegwerf-email.at',
  'wegwerf-email.de', 'wegwerf-email.net',
  'wegwerf-emails.de', 'wegwerfadresse.de',
  'wegwerfemail.com', 'wegwerfemail.de',
  'wegwerfmail.de', 'wegwerfmail.info',
  'wegwerfmail.net', 'wegwerfmail.org',
  'wetrainbayarea.com', 'wetrainbayarea.org',
  'wh4f.org', 'whatiaas.com',
  'whatpaas.com', 'whopy.com',
  'whyspam.me', 'wilemail.com',
  'willhackforfood.biz', 'willselfdestruct.com',
  'winemaven.info', 'wolfsmail.tk',
  'wollan.info', 'worldspace.link',
  'wronghead.com', 'wuzup.net',
  'wuzupmail.net', 'wwwnew.eu',
  'xagloo.com', 'xemaps.com',
  'xents.com', 'xmaily.com',
  'xoxy.net', 'yapped.net',
  'yep.it', 'yogamaven.com',
  'yuurok.com', 'zehnminuten.de',
  'zehnminutenmail.de', 'zippymail.info',
  'zoaxe.com', 'zoemail.com',
  'zoemail.net', 'zoemail.org',
  'zomg.info', 'zxcv.com',
  'zxcvbnm.com', 'zzz.com'
]);

/**
 * Check if an email uses a disposable domain
 * @param {string} email
 * @returns {boolean}
 */
export function isDisposableEmail(email) {
  if (!email) return false;
  const domain = email.toLowerCase().split('@')[1];
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}

// ============================================
// SPAM PATTERN DETECTION
// ============================================

/**
 * Check for spam patterns in email
 * @param {string} email
 * @returns {{isSpam: boolean, reason?: string}}
 */
export function checkEmailPatterns(email) {
  if (!email) return { isSpam: false };

  const localPart = email.split('@')[0].toLowerCase();

  // All numeric local part (like 12345678@gmail.com)
  if (/^\d+$/.test(localPart)) {
    return { isSpam: true, reason: 'Numeric-only email' };
  }

  // Very short local part (2 chars or less)
  if (localPart.length <= 2) {
    return { isSpam: true, reason: 'Email too short' };
  }

  // Keyboard mashing patterns (asdfg, qwerty, etc.)
  const keyboardPatterns = [
    /^[asdfghjkl]+$/i,
    /^[qwertyuiop]+$/i,
    /^[zxcvbnm]+$/i,
    /^(.)\1{4,}$/,  // Same char repeated 5+ times
    /^[a-z]{1,2}\d{6,}$/i,  // 1-2 letters + 6+ numbers (a123456)
  ];

  for (const pattern of keyboardPatterns) {
    if (pattern.test(localPart)) {
      return { isSpam: true, reason: 'Suspicious email pattern' };
    }
  }

  return { isSpam: false };
}

// ============================================
// HONEYPOT DETECTION
// ============================================

/**
 * Check if honeypot field was filled (bots fill hidden fields)
 * @param {string} honeypotValue - Value of the hidden honeypot field
 * @returns {boolean} - True if honeypot was triggered (is spam)
 */
export function isHoneypotTriggered(honeypotValue) {
  // If the hidden field has any value, it's a bot
  return honeypotValue && honeypotValue.trim().length > 0;
}

// ============================================
// COMBINED VALIDATION
// ============================================

/**
 * Run all spam checks on a booking submission
 * @param {Object} params
 * @param {string} params.email - User's email
 * @param {string} params.ip - User's IP address
 * @param {string} params.honeypot - Honeypot field value
 * @returns {{passed: boolean, reason?: string, silent?: boolean}}
 */
export function validateSubmission({ email, ip, honeypot }) {
  // Check honeypot first (silent fail for bots)
  if (isHoneypotTriggered(honeypot)) {
    return { passed: false, reason: 'Bot detected', silent: true };
  }

  // Check rate limit
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    const minutesLeft = Math.ceil(rateCheck.resetIn / 60000);
    return {
      passed: false,
      reason: `Too many requests. Please try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`,
      silent: false
    };
  }

  // Check disposable email
  if (isDisposableEmail(email)) {
    return {
      passed: false,
      reason: 'Please use a permanent email address (temporary emails are not accepted).',
      silent: false
    };
  }

  // Check email patterns
  const patternCheck = checkEmailPatterns(email);
  if (patternCheck.isSpam) {
    return {
      passed: false,
      reason: 'Please use a valid email address.',
      silent: false
    };
  }

  return { passed: true };
}
