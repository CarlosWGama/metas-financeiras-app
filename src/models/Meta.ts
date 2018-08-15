import { Frequencia } from "./Frequencia";
import { Transacao } from "./Transacao";
import { Usuario } from './Usuario';

/**
 * @author Carlos W. Gama
 * Guarda os dados de cada meta
 */
export class Meta {

    constructor(public id: string = '', public titulo: string = '', public objetivo: number = 0, public acumulado:number = 0, public temPrazo: boolean = false, public prazo?: string, public frequencia: number = Frequencia.DIARIA, public valorRecomendado: number = 0, public membros: Usuario[] = [], public transacoes: Transacao[] = []) {
    }

    /**
     * Adiciona um membro sem repetir o existente
     * @param membro 
     */
    addMembro(membro: Usuario): void {
        if (this.membros.map((u) => u.email).indexOf(membro.email) === -1)
            this.membros.push(membro);
    }

    /**
     * Realiza o casting de  Object para Meta corretamente
     */
    initialize(object) {
        if (object.id != undefined) {
            this.id = object.id;
            this.titulo = object.titulo;
            this.objetivo = Number(object.objetivo);
            this.acumulado = Number(object.acumulado);
            this.temPrazo = object.temPrazo;

            this.prazo = object.prazo;
            if (this.prazo == undefined) this.prazo = '';
            
            this.frequencia = object.frequencia;
            if (this.frequencia == undefined) this.frequencia = 1;
            
            this.valorRecomendado = object.valorRecomendado;
            if (this.valorRecomendado == undefined) this.valorRecomendado = 0;

            this.membros = object.membros;
            
            this.transacoes = object.transacoes;
            if (this.transacoes == undefined) this.transacoes = [];
        }
    }

    /**
     * Recupera transações ordenadas por usuário
     */
    get transacoesPorUsuario() {
        let transacoes: {usuario: string, transacoes: Transacao[]}[] = [];

        this.transacoes.forEach((transacao) => {
            //Checa de um grupo já foi criados
            let index = transacoes.map((t) => { return t.usuario}).indexOf(transacao.usuario);
            
            if (index === -1) //Cria um novo grupo 
                transacoes.push({usuario: transacao.usuario, transacoes: [transacao]});
            else //adiciona no grupo atual
                transacoes[index].transacoes.push(transacao);
        });
        return transacoes;
    }
}