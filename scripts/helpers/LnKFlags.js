import { cModuleName } from "../utils/LnKutils.js";
import { LnKutils, cLUpickLock, cLUbreakLock, cLUCustomCheck } from "../utils/LnKutils.js";

const cDelimiter = ";";

//Flag names
const cIDKeysF = "IDKeysFlag"; //saves the connection IDs for Locks and Key
const cLockableF = "LockableFlag"; //if this token is LockableFlag
const cLockedF = "LockedFlag"; //if this Lock is currently Locked
const cLockDCF = "LockDCFlag"; //the dc of the lock (for lock picking)
const cLPFormulaF = "LPFormulaFlag"; //the Formula the token/item adds to LockPick rolls
const cLPFormulaOverrideF = "LPFormulaOverrideFlag"; //if this objects LPFormulaFlag overrides the global formula (instead of being added)
const crequiredLPsuccessF = "requiredLPsuccessFlag"; //successes required to pick this lock
const ccurrentLPsuccessF = "currentLPsuccessFlag"; //successes alraedy put into picking this lock
const cLockBreakDCF = "LockBreakDCFlag"; //the dc of the lock (for lock breaking)
const cLBFormulaF = "LBFormulaFlag"; //the Formula the token/item adds to LockBreak rolls
const cLBFormulaOverrideF = "LBFormulaOverrideFlag"; //if this objects LBFormulaFlag overrides the global formula (instead of being added)
const cLockCCDCF = "LockCCDCFlag"; //the dc of the lock (for custom check)
const cCCFormulaF = "CCFormulaFlag"; //the Formula the token/item adds to custom check rolls
const cCCFormulaOverrideF = "CCFormulaOverrideFlag"; //if this objects CCFormulaFlag overrides the global formula (instead of being added)
const cRemoveKeyonUseF = "RemoveKeyonUseFlag"; //if this key is removed on use
const cPasskeysF = "PasskeysFlag"; //the passkeys compatible with this lock
const cCustomPopupsF = "CustomPopupsFlag"; //Flag to store the custom popups
const cSoundVariantF = "SoundVariantFlag"; //FLag for tokens which sound should play for locking
const cLockjammedF = "LockjammedFlag"; //FLag wether lock is jammed
const cSpecialLPF = "SpecialLPFlag"; //Flag that sets special Lock picks
const cReplacementItemF = "ReplacementItemFlag"; //Flag to store ids or names of items that get consumed instead of this item when present
const cLPAttemptsF = "LPAttemptsFlag"; //FLag to store the ammount of Lock Pick attempts of this lock
const cFreeLockCircumventsF = "FreeLockCircumventsFlag"; //Flagt to store how many FreeLockCircumvents this token has
const ccanbeCircumventedFreeF = "canbeCircumventedFreeFlag"; //Flag to store wether this Lock can be circumvented with a fee lock circumvent
const cRollOptionsF = "RollOptionsFlag"; //Flag to store roll options

const cPickPocketDCF = "PickPocketDCFlag"; //Flag to store the PickPocket DC
const cPickPocketFormulaF = "PickPocketFormulaFlag"; //Flag to store a custom PickPocket Formula
const cPickPocketFormulaOverrideF = "PickPocketFormulaOverrideFlag"; //Flag to set wether this objects custom PP formual overrides globale formula (instead of being added)

export { cIDKeysF, cLockableF, cLockedF, cLockDCF, cLPFormulaF, cLPFormulaOverrideF, cLockBreakDCF, cLBFormulaF, cLBFormulaOverrideF, cLockCCDCF, cCCFormulaF, cCCFormulaOverrideF, crequiredLPsuccessF, ccurrentLPsuccessF, cRemoveKeyonUseF, cPasskeysF, cCustomPopupsF, cSoundVariantF, cLockjammedF, cSpecialLPF, cReplacementItemF, cLPAttemptsF, ccanbeCircumventedFreeF, cRollOptionsF }

const cCustomPopup = { //all Custompopups and their IDs
	LockLocked : 0,
	LocknotPickable : 1,
	LocknotBreakable : 2,
	LockPasskeyTitle : 3,
	LocknotCustom : 4
};

const cRollOptionDefault = {
	LockusePick : {
		d10CritLimit : 10
	},
	LockuseBreak: {
		d10CritLimit : 10
	},
	LockuseCustom: {
		d10CritLimit : 10
	},
	PickPocket: {
		d10CritLimit : 10
	}
}

const cRollTypes = ["LockusePick", "LockuseBreak", "LockuseCustom", "PickPocket"]; //same as cLUpickLock, cLUbreakLock, cLUCustomCheck !

const cCritRollOptions = {
	"CritMethod-d10poolCoD2e" : ["d10CritLimit"]
};

export { cCustomPopup, cRollTypes, cCritRollOptions };

//buffers
var cIDKeyBuffer; //saves the coppied IDkeys

class LnKFlags {
	//DECLARATIONS
	//basic
	static async makeLockable(pObject) {} //makes pObject Lockable (starts in unlocked state except for doors)
	
	static async disableLock(pObject) {} //makes pObject not Lockable
	
	static async setLockedstate(pObject, pState) {} //sets pObject Locked state to pState (if pObject is Lockable)
	
	static async invertLockedstate(pObject) {} //inverts pObject Locked state (if pObject is Lockable)
	
	static isLockable(pObject) {} //returns if the object is already made Lockable
		
	static isLocked(pObject) {} //returns if pObject is locked (false if not Lockable)
	
	static linkKeyLock(pKey, pLock) {} //gives pKey(item) and pLock(wall or token) both the same new Key ID
	
	static matchingIDKeys(pObject1, pObject2, pConsiderName1 = false) {} //returns if pObject1 and pObject2 have at least one matching key (excluding "") (pConsiderName1 if name of pObject should be considerd as an ID)
	
	static KeyIDs(pObject) {} //returns string of key IDs of pObject
	
	static RemoveKeyonUse(pKey) {} //returns of this key is removed on use
	
	static HasKey(pLock) {} //returns if Lock has Key
	
	static ReplacementItems(pItem, praw = false) {} //returns replacement items of pItem
	
	static hasReplacementItem(pItem) {} //returns if pItem has replacment items
	
	//Passkeys
	static PassKeys(pObject) {} //returns string of Passkeys of pObject
	
	static HasPasskey(pObject) {} //if pObject has a Passkey
	
	static MatchingPasskey(pObject, Passkey) {} //if Passkey matches pObject
	
	//copy paste
	static copyIDKeys(pObject) {} //copies the ID keys of pObject and saves them
	
	static pasteIDKeys(pObject) {} //pastes the saved ID keys (if any) into the pObject
	
	//Lock dc
	static LockDC(pLock, praw = false) {} //returns the LockDC of pLock (return Infinity should DC<0 if not praw)
	
	static LockBreakDC(pLock, praw = false) {} //returns the LockBreakDC of pLock (return Infinity should DC<0 if not praw)
	
	static LockCCDC(pLock, praw = false) {} //returns the LockCCDC of pLock (return Infinity should DC<0 if not praw)
	
	static LockDCtype(pLock, pType, praw = false) {} //returns the DC of pLock of pType [cLUpickLock, cLUbreakLock, cLUCustomCheck] (return Infinity should DC<0 if not praw)
	
	static canbePicked(pLock) {} //returns if this lock can be picked
	
	static canbeBroken(pLock) {} //returns if this lock can be broken
	
	static canbeCustomChecked(pLock) {} //returns if this lock can custom checked
	
	static JamLock(pLock) {} //sets pLock Lockpick DC to unpickable value (-1)
	
	static Lockisjammed(pLock) {} //if this Lock is jammed
	
	static GetSpecialLockpicks(pLock, praw = false) {} //gets all Special lock picks for pLock
	
	static hasSpecialLockpicks(pLock) {} //if pLock has special Lockpicks
	
	static LPAttemptsLeft(pLock, pRAW = false) {} //retunrst he ammount of Lockpick attempts left in pLock
	
	static hasLPAttemptsLeft(pLock) {} //returns of pLock has any LP attempts left
	
	static async ReduceLPAttempts(pLock) {} //reduces the Lock pick attempts left in pLock
	
	static async giveFreeLockCircumvent(pToken) {} //gives pToken a free lock circumvent
	
	static async removeFreeLockCircumvent(pToken) {} //takes a free lock circumvent from pToken
	
	static hasFreeLockCircumvent(pToken) {} //returns if pToken has a free lock circumvent
	
	static canbeCircumventedFree(pLock) {} //returns if pLock can be circumvented with a free circumvent
	
	//Lock progress
	static requiredLPsuccess(pLock) {} //returns the required LP successes of this lock
	
	static currentLPsuccess(pLock) {} //returns the current LP successes of this lock
	
	static async changeLockPicksuccesses(pObject, pdelta) {} //changes the locks current successes by pdelta and returns true if this was enough to change locked state
	
	//Formulas
	static LPFormula(pObject) {} //returns the Tokens/Items Lock Pick Formula
	
	static HasLPFormula(pObject) {} //returns if the Token/Item has a Lock Pick Formula
	
	static LPFormulaOverride(pObject) {} //if this objects LP formula overrides the global formula
	
	static LBFormula(pObject) {} //returns the Tokens/Items Lock Break Formula
	
	static HasLBFormula(pObject) {} //returns if the Token/Item has a Lock Break Formula
	
	static LBFormulaOverride(pObject) {} //if this objects LB formula overrides the global formula
	
	static CCFormula(pObject) {} //returns the Tokens/Items Custom Check Formula
	
	static HasCCFormula(pObject) {} //returns if the Token/Item has a Custom Check Formula
	
	static CCFormulaOverride(pObject) {} //if this objects CC formula overrides the global formula
	
	static Formula(pObject, pType) {} //returns the Tokens/Items Formula for pTpye [cLUpickLock, cLUbreakLock, cLUCustomCheck]
	
	static HasFormula(pObject, pType) {} //returns if the Token/Item has a Formula for pTpye [cLUpickLock, cLUbreakLock, cLUCustomCheck]
	
	static FormulaOverride(pObject, pType) {} //if this objects Formula for pTpye [cLUpickLock, cLUbreakLock, cLUCustomCheck] overrides the global formula
	
	static RollOptions(pObject, pRollType, pRollOption, pFallbackValue = undefined) {} //returns the pRollOption of pRollType belonging to pObject (returns cRollOptionDefault otherwise)
	
	//PickPocket
	static PickPocketDC(pToken, pRAW = false) {} //returns the PickPocketDC of pToken
	
	static Canbepickpocketed(pToken) {} //returns wether pToken can be pick pocketed
	
	static HasPickPocketFormula(pObject) {} //returns wether this pToken has a pick pocket formula
	
	static PickPocketFormula(pObject) {} //returns the pick pocket formula of pObject
	
	static PickPocketFormulaOverrides(pObject) {} //returns wether this object Pick pocket formula overrides
	
	//popups
	static setCustomPopups(pObject, pPopups) {} //set the custom popups of pObject to pPopups
	
	static getCustomPopups(pObject, pID = "") {} //get the custom Popups of pObject (or a specific element where pID can be the numerical value (see cCustomPopup) or the Key)
	
	static CustomPopupsKeys() {} //returns all Custompopups Keys sorted by their IDs
	
	//sounds
	static SoundVariant(pObject) {} //returns sound variant for this token
	
	//IMPLEMENTATIONS
	
	//flags handling support	
	static #LnKFlags (pObject) {	
	//returns all Module Flags of pObject (if any)
		if (pObject) {
			if (pObject.flags.hasOwnProperty(cModuleName)) {
				return pObject.flags.LocknKey;
			}
		}
		
		return; //if anything fails
	} 
	
	static #IDKeysFlag (pObject) { 
	//returns content of ID keys flag of pObject (if any) (array of IDs)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cIDKeysF)) {
				return vFlag.IDKeysFlag;
			}
		}
		
		return ""; //default if anything fails
	} 
	
	static #LockableFlag (pObject) { 
	//returns content of LockableFlag of pObject (if any) (Boolean)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cLockableF)) {
				return vFlag.LockableFlag;
			}
		}
		
		return (false || LnKutils.isWall(pObject)); //default if anything fails (walls are Lockable by default)
	} 
	
	static #LockedFlag (pObject) { 
	//returns content of Locked of pObject (if any) (Boolean)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cLockedF)) {
				return vFlag.LockedFlag;
			}
		}
		
		return false; //default if anything fails
	} 
	
	static #LockDCFlag (pObject) { 
	//returns content of LockDC of pObject (if any) (Number)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cLockDCF)) {
				return vFlag.LockDCFlag;
			}
		}
		
		return game.settings.get(cModuleName, "DefaultPickDC"); //default if anything fails
	} 
	
	static #LPFormulaFlag (pObject) { 
	//returns content of LPFormula of pObject (if any) (string)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cLPFormulaF)) {
				return vFlag.LPFormulaFlag;
			}
		}
		
		return ""; //default if anything fails
	} 
	
	static #LPFormulaOverrideFlag (pObject) { 
	//returns content of LPFormulaOverrideFlag of pObject (if any) (Boolean)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cLPFormulaOverrideF)) {
				return vFlag.LPFormulaOverrideFlag;
			}
		}
		
		return false; //default if anything fails
	} 
	
	static #requiredLPsuccessFlag (pObject) { 
	//returns content of requiredLPsuccessFlag of pObject (if any) (number)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(crequiredLPsuccessF)) {
				return vFlag.requiredLPsuccessFlag;
			}
		}
		
		return 1; //default if anything fails
	} 
	
	static #currentLPsuccessFlag (pObject) { 
	//returns content of currentLPsuccessFlag of pObject (if any) (number)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(ccurrentLPsuccessF)) {
				return vFlag.currentLPsuccessFlag;
			}
		}
		
		return 0; //default if anything fails
	} 
	
	static #LockBreakDCFlag (pObject) { 
	//returns content of LockBreakDC of pObject (if any) (Number)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cLockBreakDCF)) {
				return vFlag.LockBreakDCFlag;
			}
		}
		
		return game.settings.get(cModuleName, "DefaultBreakDC"); //default if anything fails
	}
	
	static #LBFormulaFlag (pObject) { 
	//returns content of LBFormula of pObject (if any) (string)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cLBFormulaF)) {
				return vFlag.LBFormulaFlag;
			}
		}
		
		return ""; //default if anything fails
	} 
	
	static #LBFormulaOverrideFlag (pObject) { 
	//returns content of LBFormulaOverrideFlag of pObject (if any) (Boolean)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cLBFormulaOverrideF)) {
				return vFlag.LBFormulaOverrideFlag;
			}
		}
		
		return false; //default if anything fails
	} 
	
	static #LockCCDCFlag (pObject) { 
	//returns content of LockCCDC of pObject (if any) (Number)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cLockCCDCF)) {
				return vFlag.LockCCDCFlag;
			}
		}
		
		return game.settings.get(cModuleName, "CustomCircumventDefaultDC"); //default if anything fails
	}
	
	static #CCFormulaFlag (pObject) { 
	//returns content of CCFormula of pObject (if any) (string)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cCCFormulaF)) {
				return vFlag.CCFormulaFlag;
			}
		}
		
		return ""; //default if anything fails
	} 
	
	static #CCFormulaOverrideFlag (pObject) { 
	//returns content of CCFormulaOverrideFlag of pObject (if any) (Boolean)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cCCFormulaOverrideF)) {
				return vFlag.CCFormulaOverrideFlag;
			}
		}
		
		return false; //default if anything fails
	} 
	
	static #RemoveKeyonUseFlag (pObject) { 
	//returns content of RemoveKeyonUseFlag (Boolean)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cRemoveKeyonUseF)) {
				return vFlag.RemoveKeyonUseFlag;
			}
		}
		
		return false; //default if anything fails
	} 
	
	static #PasskeysFlag (pObject) { 
	//returns content of Passkeys flag of pObject (if any) (collection of IDs)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cPasskeysF)) {
				return vFlag.PasskeysFlag;
			}
		}
		
		return ""; //default if anything fails
	} 
	
	static #CustomPopupsFlag (pObject) { 
	//returns content of CustomPopups Flag of pObject (if any) (array of srtings)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cCustomPopupsF)) {
				return vFlag.CustomPopupsFlag;
			}
		}
		
		let vZeroResult = {};
		
		for (let vKey of LnKFlags.CustomPopupsKeys()) {
			vZeroResult[vKey] == "";
		}
		
		return vZeroResult; //default if anything fails
	} 
	
	static #SoundVariantFlag (pObject) { 
	//returns content of SoundVariantFlag of pObject (if any) (string)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cSoundVariantF)) {
				return vFlag.SoundVariantFlag;
			}
		}
		
		return game.settings.get(cModuleName, "DefaultLockSound"); //default if anything fails
	} 
	
	static #LockjammedFlag (pObject) { 
	//returns content of LockjammedFlag of pObject (if any) (Boolean)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cLockjammedF)) {
				return vFlag.LockjammedFlag;
			}
		}
		
		return false; //default if anything fails
	} 
	
	static #SpecialLPFlag (pObject) {
	//returns content of SpecialLPFlag of pObject (String)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cSpecialLPF)) {
				return vFlag.SpecialLPFlag;
			}
		}
		
		return ""; //default if anything fails		
	}
	
	static #ReplacementItemFlag (pObject) {
	//returns content of ReplacementItemFlag ofpObject (String)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cReplacementItemF)) {
				return vFlag.ReplacementItemFlag;
			}
		}
		
		return ""; //default if anything fails		
	}
	
	static #LPAttemptsFlag (pObject) {
	//returns content of LPAttemptsFlag ofpObject (number)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cLPAttemptsF)) {
				return vFlag.LPAttemptsFlag;
			}
		}
		
		return game.settings.get(cModuleName, "defaultLPAttempts"); //default if anything fails				
	}
	
	static #FreeLockCircumventsFlag (pObject) {
	//returns content of FreeLockCircumventsFlag ofpObject (number)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cFreeLockCircumventsF)) {
				return vFlag.FreeLockCircumventsFlag;
			}
		}
		
		return 0; //default if anything fails				
	}
	
	static #PickPocketDCFlag (pToken) {
	//returns content of PickPocketDC pToken (number)
		let vFlag = this.#LnKFlags(pToken);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cPickPocketDCF)) {
				return vFlag.PickPocketDCFlag;
			}
		}
		
		return -1; //default if anything fails				
	}
	
	static #PickPocketFormulaFlag (pObject) { 
	//returns content of PickPocketFormula of pObject (if any) (string)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cPickPocketFormulaF)) {
				return vFlag.PickPocketFormulaFlag;
			}
		}
		
		return ""; //default if anything fails
	} 
	
	static #PickPocketFormulaOverrideFlag (pObject) { 
	//returns content of PickPocketFormulaOverrideFlag of pObject (if any) (Boolean)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cPickPocketFormulaOverrideF)) {
				return vFlag.PickPocketFormulaOverrideFlag;
			}
		}
		
		return false; //default if anything fails
	}
	
	static #canbeCircumventedFreeFlag (pObject) {
	//returns content of canbeCircumventedFreeFlag ofpObject (number)
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(ccanbeCircumventedFreeF)) {
				return vFlag.canbeCircumventedFreeFlag;
			}
		}
		
		return true; //default if anything fails				
	}
	
	static #RollOptionsFlag (pObject) {
	//returns content of this objects roll options
		let vFlag = this.#LnKFlags(pObject);
		
		if (vFlag) {
			if (vFlag.hasOwnProperty(cRollOptionsF)) {
				return vFlag.RollOptionsFlag;
			}
		}
		
		return cRollOptionDefault;
	}
	
	static async #setIDKeysFlag (pObject, pContent) {
	//sets content of IDKeysFlag (must be array of IDs)
		if (pObject) {
			if (typeof pContent == "string") {
				let vBuffer = pContent.split(cDelimiter).filter(vElement => vElement.length); //remove empty elements
				
				await pObject.setFlag(cModuleName, cIDKeysF, vBuffer.join(cDelimiter)); 
				
				return true;
			}
		}
		return false;
	} 
	
	static async #addIDKeysFlag (pObject, pContent) {
	//sets content of IDKeysFlag (must be a IDs)
		if (pObject) {
			if (typeof pContent == "string") {
				let vBuffer = this.#IDKeysFlag(pObject).split(cDelimiter);
				
				//concat new and old key, prevent clones
				vBuffer = vBuffer.concat(pContent.split(cDelimiter).filter(vElement => !vBuffer.includes(vElement)));
				
				await this.#setIDKeysFlag(pObject, vBuffer.join(cDelimiter));
				
				return true;
			}
		}
		return false;
	}  
	
	static async #setLockableFlag(pObject, pContent) {
	//sets content of LockableFlag (must be boolean)
		if (pObject) {
			await pObject.setFlag(cModuleName, cLockableF, Boolean(pContent));
			
			return true;
		}
		return false;		
	}
	
	static async #setLockedFlag(pObject, pContent) {
	//sets content of LockedFlag (must be boolean)
		if (pObject) {
			await pObject.setFlag(cModuleName, cLockedF, Boolean(pContent));
			
			return true;
		}
		return false;		
	}
	
	static async #setLockDCFlag(pObject, pContent) {
	//sets content of LockDCFlag (must be number)
		if (pObject) {
			await pObject.setFlag(cModuleName, cLockDCF, Number(pContent));
			
			return true;
		}
		return false;		
	}
	
	static async #setcurrentLPsuccessFlag(pObject, pContent) {
	//sets content of currentLPsuccessFlag (must be number)
		if (pObject) {
			await pObject.setFlag(cModuleName, ccurrentLPsuccessF, Number(pContent));
			
			return true;
		}
		return false;		
	}
	
	static async #setCustomPopupsFlag(pObject, pContent) {
	//sets content of CustomPopupsFlag (must be number)
		if (pObject && typeof pContent == "object") {
			await pObject.setFlag(cModuleName, cCustomPopupsF, pContent);
			
			return true;
		}
		return false;			
	}
	
	static async #setLockjammedFlag(pObject, pContent) {
	//sets content of Lockjammed flag (must be boolean)
		if (pObject) {
			await pObject.setFlag(cModuleName, cLockjammedF, Boolean(pContent));
			
			return true;
		}
		return false;		
	}
	
	static async #setLPAttemptsFlag(pObject, pContent) {
	//sets content of LPAttemptsFlag (must be number)
		if (pObject) {
			await pObject.setFlag(cModuleName, cLPAttemptsF, Number(pContent));
			
			return true;
		}
		return false;		
	}
	
	static async #setFreeLockCircumventsFlag(pObject, pContent) {
	//sets content of FreeLockCircumventsFlag (must be number)
		if (pObject) {
			await pObject.setFlag(cModuleName, cFreeLockCircumventsF, Number(pContent));
			
			return true;
		}
		return false;		
	}
	
	//basic
	static async makeLockable(pObject) {
		if (!this.#LockableFlag(pObject)) {
			//only change anything if not already lockable
			await this.#setLockableFlag(pObject, true);
			
			await this.#setLockedFlag(pObject, game.settings.get(cModuleName, "startasLocked"));
		}
	}
	
	static async disableLock(pObject) {
		if (this.#LockableFlag(pObject)) {
			//only change anything if not already lockable
			await this.#setLockableFlag(pObject, false);
			
			await this.#setLockedFlag(pObject, false);
		}		
	}
		
	static async setLockedstate(pObject, pState) {
		if (this.#LockableFlag(pObject)) {
			await this.#setLockedFlag(pObject, pState);
		}
	}
	
	static async invertLockedstate(pObject) {
		if (this.#LockableFlag(pObject)) {
			await this.#setLockedFlag(pObject, !this.#LockedFlag(pObject));
		}
	}
	
	static isLockable(pObject) {	
		return this.#LockableFlag(pObject) && LnKutils.isLockCompatible(pObject);
	}
	
	static isLocked(pObject) {		
		return (this.#LockableFlag(pObject) && this.#LockedFlag(pObject))
	}
	
	static linkKeyLock(pKey, pLock) {
		let vnewID = randomID();
		
		this.#addIDKeysFlag(pKey, vnewID);
		
		this.#addIDKeysFlag(pLock, vnewID);
	}
	
	static matchingIDKeys(pObject1, pObject2, pConsiderName1 = false) {	
		return Boolean(LnKutils.Intersection(this.#IDKeysFlag(pObject1).split(cDelimiter), this.#IDKeysFlag(pObject2).split(cDelimiter)).length) || (pConsiderName1 && pObject1.name && this.#IDKeysFlag(pObject2).split(cDelimiter).includes(pObject1.name));
	}
	
	static KeyIDs(pObject) {
		return this.#IDKeysFlag(pObject);
	}
	
	static RemoveKeyonUse(pKey) {
		return this.#RemoveKeyonUseFlag(pKey);
	} 
	
	static HasKey(pLock) {
		return (this.#IDKeysFlag(pLock).length > 0);
	}
	
	static ReplacementItems(pItem, praw = false) {
		if (praw) {
			return this.#ReplacementItemFlag(pItem);
		}
		else {
			return this.#ReplacementItemFlag(pItem).split(cDelimiter);
		}
	}
	
	static hasReplacementItem(pItem) {
		return this.#ReplacementItemFlag(pItem).length > 0;
	}
	
	//Passkeys
	static PassKeys(pObject) {
		return this.#PasskeysFlag(pObject);
	}
	
	static HasPasskey(pObject) {
		return (this.#PasskeysFlag(pObject).length > 0);
	}
	
	static MatchingPasskey(pObject, Passkey) {
		if (Passkey.length > 0) {
			//empty Passkey not allowed
			return this.#PasskeysFlag(pObject).split(cDelimiter).includes(Passkey);
		}
		
		return false;
	}
	
	//copy paste
	static copyIDKeys(pObject) {
		cIDKeyBuffer = this.#IDKeysFlag(pObject);
	}
	
	static pasteIDKeys(pObject) {
		if (cIDKeyBuffer.length) {
			this.#addIDKeysFlag(pObject, cIDKeyBuffer);
			
			LnKFlags.makeLockable(pObject);
		}
	}
	
	//Lock dc
	static LockDC(pLock, praw = false) {
		let vDC = this.#LockDCFlag(pLock);
		
		if ((vDC == -1 || LnKFlags.Lockisjammed(pLock) || !LnKFlags.LPAttemptsLeft(pLock)) && !praw) {
			vDC = Infinity;
		}
		
		return vDC;
	}
	
	static LockBreakDC(pLock, praw = false) {
		let vDC = this.#LockBreakDCFlag(pLock);
		
		if (vDC == -1 && !praw) {
			vDC = Infinity;
		}
		
		return vDC;
	}
	
	static LockCCDC(pLock, praw = false) {
		let vDC = this.#LockCCDCFlag(pLock);
		
		if (vDC == -1 && !praw) {
			vDC = Infinity;
		}
		
		return vDC;		
	}
	
	static LockDCtype(pLock, pType, praw = false) {
		switch (pType) {
			case cLUpickLock:		
				return LnKFlags.LockDC(pLock, praw);
				break;
			case cLUbreakLock:
				return LnKFlags.LockBreakDC(pLock, praw);
				break;
			case cLUCustomCheck:
				return LnKFlags.LockCCDC(pLock, praw);
				break;
			default:
				return false;
				break;
		}
	}
	
	static canbePicked(pLock) {
		return (LnKFlags.LockDC(pLock) < Infinity) && (!LnKFlags.Lockisjammed(pLock)) && LnKFlags.hasLPAttemptsLeft(pLock);
	}
	
	static canbeBroken(pLock) {
		return LnKFlags.LockBreakDC(pLock) < Infinity;
	}
	
	static canbeCustomChecked(pLock) {
		return (LnKFlags.LockCCDC(pLock) < Infinity) && game.settings.get(cModuleName, "CustomCircumventActive");
	} 
	
	static JamLock(pLock) {
		this.#setLockjammedFlag(pLock, true);
	}
	
	static Lockisjammed(pLock) {
		return this.#LockjammedFlag(pLock);
	}
	
	static GetSpecialLockpicks(pLock, praw = false) {
		if (praw) {
			return this.#SpecialLPFlag(pLock);
		}
		else {
			return this.#SpecialLPFlag(pLock).split(cDelimiter).filter(vElement => vElement.length > 0);
		}
	}
	
	static LPAttemptsLeft(pLock, pRAW = false) {
		let vLPAleft = this.#LPAttemptsFlag(pLock);
		
		if (pRAW) {
			return vLPAleft;
		}
		
		if (vLPAleft < 0) {
			vLPAleft = Infinity;
		}
		
		return vLPAleft;
	}
	
	static hasLPAttemptsLeft(pLock) {
		return LnKFlags.LPAttemptsLeft(pLock) > 0;
	}
	
	static async ReduceLPAttempts(pLock) {
		if (LnKFlags.hasLPAttemptsLeft(pLock)) {
			await this.#setLPAttemptsFlag(pLock, this.#LPAttemptsFlag(pLock)-1);
		}
	}
	
	static async giveFreeLockCircumvent(pToken) {
		this.#setFreeLockCircumventsFlag(pToken, 1);
	}
	
	static async removeFreeLockCircumvent(pToken) {
		this.#setFreeLockCircumventsFlag(pToken, 0);
	}
	
	static hasFreeLockCircumvent(pToken) {
		return this.#FreeLockCircumventsFlag(pToken) > 0;
	}
	
	static canbeCircumventedFree(pLock) {
		return this.#canbeCircumventedFreeFlag(pLock);
	}
	
	//Lock progress
	static requiredLPsuccess(pLock) {
		return this.#requiredLPsuccessFlag(pLock);
	}
	
	static currentLPsuccess(pLock) {
		return this.#currentLPsuccessFlag(pLock);
	}
	
	static async changeLockPicksuccesses(pObject, pdelta) {
		let vToggle = false;
		
		await this.#setcurrentLPsuccessFlag(pObject, await this.#currentLPsuccessFlag(pObject) + pdelta);
		
		if (!LnKutils.useMultiSuccess(pObject) || (await this.#currentLPsuccessFlag(pObject) >= await this.#requiredLPsuccessFlag(pObject))) {
			//success limit reached, reset successes and toggle lock
			await this.#setcurrentLPsuccessFlag(pObject, 0);
			
			if (pdelta > 0) {
				//requires change of at least 1 to toggle (even if required <= 0)
				vToggle = true;
			}
		}
		
		if (await this.#currentLPsuccessFlag(pObject) < 0) {
			//under zero, reset to zero
			await this.#setcurrentLPsuccessFlag(pObject, 0);
		}
			
		return vToggle;
	}
	
	//Formulas
	static LPFormula(pObject) {
		return this.#LPFormulaFlag(pObject);
	}
	
	static HasLPFormula(pObject) {
		return Boolean(this.#LPFormulaFlag(pObject).length)
	}
	
	static LPFormulaOverride(pObject) {
		return this.#LPFormulaOverrideFlag(pObject);
	}
	
	static LBFormula(pObject) {
		return this.#LBFormulaFlag(pObject);
	}
	
	static HasLBFormula(pObject) {
		return Boolean(this.#LBFormulaFlag(pObject).length)
	}
	
	static LBFormulaOverride(pObject) {
		return this.#LBFormulaOverrideFlag(pObject);
	}
	
	static CCFormula(pObject) {
		return this.#CCFormulaFlag(pObject);
	}
	
	static HasCCFormula(pObject) {
		return Boolean(this.#CCFormulaFlag(pObject).length)
	}
	
	static CCFormulaOverride(pObject) {
		return this.#CCFormulaOverrideFlag(pObject);
	}
	
	static Formula(pObject, pType) {
		switch (pType) {
			case cLUpickLock:		
				return LnKFlags.LPFormula(pObject);
				break;
			case cLUbreakLock:
				return LnKFlags.LBFormula(pObject);
				break;
			case cLUCustomCheck:
				return LnKFlags.CCFormula(pObject);
				break;
			default:
				return "";
				break;
		}
	}
	
	static HasFormula(pObject, pType) {
		switch (pType) {
			case cLUpickLock:		
				return LnKFlags.HasLPFormula(pObject);
				break;
			case cLUbreakLock:
				return LnKFlags.HasLBFormula(pObject);
				break;
			case cLUCustomCheck:
				return LnKFlags.HasCCFormula(pObject);
				break;
			default:
				return false;
				break;
		}		
	}
	
	static FormulaOverride(pObject, pType) {
		switch (pType) {
			case cLUpickLock:		
				return LnKFlags.LPFormulaOverride(pObject);
				break;
			case cLUbreakLock:
				return LnKFlags.LBFormulaOverride(pObject);
				break;
			case cLUbreakLock:
				return LnKFlags.CCFormulaOverride(pObject);
				break;
			default:
				return false;
				break;
		}			
	}
	
	static RollOptions(pObject, pRollType, pRollOption, pFallbackValue = undefined) {
		let vOptions = LnKFlags.#RollOptionsFlag(pObject);
		
		if (vOptions.hasOwnProperty(pRollType)) {
			if (vOptions[pRollType].hasOwnProperty(pRollOption)) {
				return vOptions[pRollType][pRollOption];
			}
		}
		
		if (cRollOptionDefault.hasOwnProperty(pRollType)) {
			if (cRollOptionDefault[pRollType].hasOwnProperty(pRollOption)) {
				return cRollOptionDefault[pRollType][pRollOption];
			}
		}
		
		return pFallbackValue; //something failed, panic, let everything go, run, scream, start praying, the apocalypse is near!
	}
	
	//PickPocket
	static PickPocketDC(pToken, pRAW = false) {
		let vDC = this.#PickPocketDCFlag(pToken);
		
		if (vDC == -1 && !praw) {
			vDC = Infinity;
		}
		
		return vDC;
	}
	
	static Canbepickpocketed(pToken) {
		return LnKFlags.PickPocketDC(pToken) < Infinity;
	}
	
	static HasPickPocketFormula(pObject) {
		return (this.#PickPocketFormulaFlag(pObject).length > 0)
	}
	
	static PickPocketFormula(pObject) {
		return this.#PickPocketFormulaFlag(pObject);
	}
	
	static PickPocketFormulaOverrides(pObject) {
		return this.#PickPocketFormulaOverrideFlag(pObject);
	}
	
	//popups
	static setCustomPopups(pObject, pPopups) {
		this.#setCustomPopupsFlag(pObject, pPopups)
	}
	
	static getCustomPopups(pObject, pID = "") {
		let vID;
		if ((typeof pID) == "number") {
			vID = LnKFlags.CustomPopupsKeys().find(vKey => cCustomPopup[vKey] == pID);
		}
		else {
			vID = pID;
		}
		
		if ((typeof vID) == "string") {		
			if (vID == "") {
				return this.#CustomPopupsFlag(pObject);
			}
			else {
				if (LnKFlags.CustomPopupsKeys().includes(vID) && this.#CustomPopupsFlag(pObject)[vID] != undefined) {
					return this.#CustomPopupsFlag(pObject)[vID];
				}
				else {
					return "";
				}
			}
		}
		
		return "";
	}
	
	static CustomPopupsKeys() {
		return Object.keys(cCustomPopup).sort(function(va,vb){return cCustomPopup[va] - cCustomPopup[vb]});
	}
	
	//sounds
	static SoundVariant(pObject) {
		return this.#SoundVariantFlag(pObject);
	}
}

//export LnKFlags
export { LnKFlags }