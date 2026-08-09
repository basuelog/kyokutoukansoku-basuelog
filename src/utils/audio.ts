/**
 * このクラスは、Web Audio APIを使用してビープ音を生成および再生するためのBeepPlayerクラスです。
 * AudioContextとGainNodeを初期化し、ビープ音の音量を制御します。
 * playBeepメソッドでは、再生するビープ音の周波数と持続時間を指定できます。
 * 
 */
export class BeepPlayer {
  private audioCtx: AudioContext|null = null;
  private masterGain: GainNode|null = null;

  private init(): void{
    if(!this.audioCtx){
      this.audioCtx = new AudioContext();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.connect(this.audioCtx.destination);
    }
  }

  public playBeep(frequency: number, duration: number): void {
    this.init();
    if(this.audioCtx && this.masterGain){
      this.masterGain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.00001, this.audioCtx.currentTime + duration);
      const osc = new OscillatorNode(this.audioCtx, {
        type: 'sine',
        frequency: frequency
      });
      osc.connect(this.masterGain);
      osc.start();    
      osc.stop(this.audioCtx.currentTime + duration);
    } 
  }
}
export const beepPlayer = new BeepPlayer();
